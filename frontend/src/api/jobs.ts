import api from './client';
import { Job } from '../types';

export const jobsApi = {
  getJobs: (params?: { q?: string; type?: string; isRemote?: boolean; page?: number; limit?: number }) =>
    api.get<{ success: boolean; data: { jobs: Job[]; total: number; page: number; limit: number } }>('/jobs', { params }),

  getJob: (id: string) =>
    api.get<{ success: boolean; data: Job }>(`/jobs/${id}`),

  applyToJob: (id: string, coverLetter?: string) =>
    api.post(`/jobs/${id}/apply`, { coverLetter }),

  getMyApplications: () =>
    api.get('/jobs/my-applications'),

  createJob: (data: Partial<Job>) =>
    api.post<{ success: boolean; data: Job }>('/jobs', data)
};
