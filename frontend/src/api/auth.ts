import api from './client';
import { User } from '../types';

interface AuthResponse {
  user: User;
  token: string;
}

export const authApi = {
  register: (data: { email: string; password: string; name: string; university?: string; major?: string; graduationYear?: number }) =>
    api.post<{ success: boolean; data: AuthResponse }>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<{ success: boolean; data: AuthResponse }>('/auth/login', data),

  getMe: () =>
    api.get<{ success: boolean; data: User }>('/auth/me')
};
