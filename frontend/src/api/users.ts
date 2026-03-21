import api from './client';
import { User } from '../types';

export const usersApi = {
  getProfile: (id: string) =>
    api.get<{ success: boolean; data: User & { connectionStatus: string | null } }>(`/users/${id}`),

  updateProfile: (data: Partial<User>) =>
    api.put<{ success: boolean; data: User }>('/users/me', data),

  searchUsers: (params: { q?: string; university?: string; major?: string; page?: number; limit?: number }) =>
    api.get<{ success: boolean; data: { users: User[]; total: number } }>('/users/search', { params }),

  getConnections: (id: string) =>
    api.get<{ success: boolean; data: User[] }>(`/users/${id}/connections`),

  sendConnection: (toUserId: string) =>
    api.post(`/users/${toUserId}/connect`),

  respondToConnection: (fromUserId: string, action: 'accept' | 'reject') =>
    api.put(`/users/connections/${fromUserId}/respond`, { action })
};
