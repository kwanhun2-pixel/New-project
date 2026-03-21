import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../models/prisma';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../types';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, university, major, graduationYear } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(409).json({ success: false, error: '이미 사용 중인 이메일입니다' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, university, major, graduationYear },
      select: { id: true, email: true, name: true, university: true, major: true }
    });

    const token = generateToken({ id: user.id, email: user.email });
    res.status(201).json({ success: true, data: { user, token } });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ success: false, error: '이메일 또는 비밀번호가 올바르지 않습니다' });
      return;
    }

    const token = generateToken({ id: user.id, email: user.email });
    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, data: { user: userWithoutPassword, token } });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      select: {
        id: true, email: true, name: true, headline: true, bio: true,
        avatarUrl: true, university: true, major: true, graduationYear: true,
        location: true, website: true, createdAt: true,
        _count: {
          select: {
            connectionsFrom: { where: { status: 'ACCEPTED' } },
            posts: true
          }
        }
      }
    });
    res.json({ success: true, data: user });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};
