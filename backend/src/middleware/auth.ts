import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest, JwtPayload } from '../types';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: '인증이 필요합니다' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = { id: payload.id, email: payload.email };
    next();
  } catch {
    res.status(401).json({ success: false, error: '유효하지 않은 토큰입니다' });
  }
};
