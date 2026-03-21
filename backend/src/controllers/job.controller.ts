import { Response } from 'express';
import { prisma } from '../models/prisma';
import { AuthRequest } from '../types';
import { getPagination } from '../utils/pagination';

export const getJobs = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { q, type, isRemote, page, limit } = req.query as Record<string, string>;
    const { take, skip } = getPagination(page, limit);

    const where: Record<string, unknown> = {};
    if (q) {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { company: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } }
      ];
    }
    if (type) where.type = type;
    if (isRemote === 'true') where.isRemote = true;

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        take,
        skip,
        include: { _count: { select: { applications: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.job.count({ where })
    ]);

    res.json({ success: true, data: { jobs, total, page: parseInt(page || '1'), limit: take } });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const getJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const job = await prisma.job.findUnique({
      where: { id },
      include: { _count: { select: { applications: true } } }
    });

    if (!job) {
      res.status(404).json({ success: false, error: '채용 공고를 찾을 수 없습니다' });
      return;
    }

    let hasApplied = false;
    if (req.user) {
      const application = await prisma.jobApplication.findUnique({
        where: { jobId_userId: { jobId: id, userId: req.user.id } }
      });
      hasApplied = !!application;
    }

    res.json({ success: true, data: { ...job, hasApplied } });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const applyToJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: jobId } = req.params;
    const { coverLetter } = req.body;
    const userId = req.user!.id;

    const existing = await prisma.jobApplication.findUnique({
      where: { jobId_userId: { jobId, userId } }
    });

    if (existing) {
      res.status(409).json({ success: false, error: '이미 지원한 공고입니다' });
      return;
    }

    const application = await prisma.jobApplication.create({
      data: { jobId, userId, coverLetter },
      include: { job: { select: { title: true, company: true } } }
    });

    res.status(201).json({ success: true, data: application });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const getMyApplications = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const applications = await prisma.jobApplication.findMany({
      where: { userId: req.user!.id },
      include: { job: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json({ success: true, data: applications });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const createJob = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, company, location, description, requirements, salary, type, isRemote, tags, applyUrl, deadline } = req.body;

    const job = await prisma.job.create({
      data: {
        title, company, location, description,
        requirements: requirements || [],
        salary, type, isRemote, tags: tags || [],
        applyUrl, deadline: deadline ? new Date(deadline) : undefined
      }
    });

    res.status(201).json({ success: true, data: job });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};
