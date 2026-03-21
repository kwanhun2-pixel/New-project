import { Response } from 'express';
import { prisma } from '../models/prisma';
import { AuthRequest } from '../types';
import { getPagination } from '../utils/pagination';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true, name: true, email: true, headline: true, bio: true,
        avatarUrl: true, university: true, major: true, graduationYear: true,
        location: true, website: true, createdAt: true,
        experiences: { orderBy: { startDate: 'desc' } },
        educations: { orderBy: { startYear: 'desc' } },
        skills: { include: { skill: true } },
        projects: { orderBy: { createdAt: 'desc' } },
        _count: {
          select: {
            connectionsFrom: { where: { status: 'ACCEPTED' } },
            posts: true
          }
        }
      }
    });

    if (!user) {
      res.status(404).json({ success: false, error: '사용자를 찾을 수 없습니다' });
      return;
    }

    // Check connection status
    let connectionStatus = null;
    if (req.user && req.user.id !== id) {
      const connection = await prisma.connection.findFirst({
        where: {
          OR: [
            { fromUserId: req.user.id, toUserId: id },
            { fromUserId: id, toUserId: req.user.id }
          ]
        }
      });
      connectionStatus = connection?.status ?? 'NONE';
    }

    res.json({ success: true, data: { ...user, connectionStatus } });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, headline, bio, university, major, graduationYear, location, website } = req.body;

    const user = await prisma.user.update({
      where: { id: req.user!.id },
      data: { name, headline, bio, university, major, graduationYear, location, website },
      select: {
        id: true, name: true, email: true, headline: true, bio: true,
        avatarUrl: true, university: true, major: true, graduationYear: true,
        location: true, website: true
      }
    });

    res.json({ success: true, data: user });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const searchUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { q, university, major, page, limit } = req.query as Record<string, string>;
    const { take, skip } = getPagination(page, limit);

    const where: Record<string, unknown> = {};
    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { headline: { contains: q, mode: 'insensitive' } },
        { university: { contains: q, mode: 'insensitive' } },
        { major: { contains: q, mode: 'insensitive' } }
      ];
    }
    if (university) where.university = { contains: university, mode: 'insensitive' };
    if (major) where.major = { contains: major, mode: 'insensitive' };

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        take,
        skip,
        select: {
          id: true, name: true, headline: true, avatarUrl: true,
          university: true, major: true, graduationYear: true
        },
        orderBy: { name: 'asc' }
      }),
      prisma.user.count({ where })
    ]);

    res.json({ success: true, data: { users, total, page: parseInt(page || '1'), limit: take } });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const getConnections = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { fromUserId: id, status: 'ACCEPTED' },
          { toUserId: id, status: 'ACCEPTED' }
        ]
      },
      include: {
        fromUser: { select: { id: true, name: true, headline: true, avatarUrl: true, university: true } },
        toUser: { select: { id: true, name: true, headline: true, avatarUrl: true, university: true } }
      }
    });

    const connectedUsers = connections.map(c =>
      c.fromUserId === id ? c.toUser : c.fromUser
    );

    res.json({ success: true, data: connectedUsers });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const sendConnection = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { toUserId } = req.params;
    const fromUserId = req.user!.id;

    if (fromUserId === toUserId) {
      res.status(400).json({ success: false, error: '자기 자신에게 연결 요청을 보낼 수 없습니다' });
      return;
    }

    const existing = await prisma.connection.findFirst({
      where: {
        OR: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId }
        ]
      }
    });

    if (existing) {
      res.status(409).json({ success: false, error: '이미 연결 요청이 존재합니다' });
      return;
    }

    const connection = await prisma.connection.create({
      data: { fromUserId, toUserId }
    });

    await prisma.notification.create({
      data: {
        targetId: toUserId,
        actorId: fromUserId,
        type: 'CONNECTION_REQUEST',
        message: '연결 요청을 보냈습니다',
        link: `/profile/${fromUserId}`
      }
    });

    res.status(201).json({ success: true, data: connection });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const respondToConnection = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { fromUserId } = req.params;
    const toUserId = req.user!.id;
    const { action } = req.body; // 'accept' | 'reject'

    const connection = await prisma.connection.findUnique({
      where: { fromUserId_toUserId: { fromUserId, toUserId } }
    });

    if (!connection) {
      res.status(404).json({ success: false, error: '연결 요청을 찾을 수 없습니다' });
      return;
    }

    if (action === 'accept') {
      await prisma.connection.update({
        where: { fromUserId_toUserId: { fromUserId, toUserId } },
        data: { status: 'ACCEPTED' }
      });
      await prisma.notification.create({
        data: {
          targetId: fromUserId,
          actorId: toUserId,
          type: 'CONNECTION_ACCEPTED',
          message: '연결 요청을 수락했습니다',
          link: `/profile/${toUserId}`
        }
      });
    } else {
      await prisma.connection.update({
        where: { fromUserId_toUserId: { fromUserId, toUserId } },
        data: { status: 'REJECTED' }
      });
    }

    res.json({ success: true, message: action === 'accept' ? '연결 요청을 수락했습니다' : '연결 요청을 거절했습니다' });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};
