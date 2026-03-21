import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export interface JwtPayload {
  id: string;
  email: string;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
