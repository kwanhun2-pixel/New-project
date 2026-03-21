import api from './client';
import { Post, Comment } from '../types';

export const postsApi = {
  getFeed: (page = 1, limit = 10) =>
    api.get<{ success: boolean; data: { posts: Post[]; total: number; page: number; limit: number } }>('/posts/feed', { params: { page, limit } }),

  getPost: (id: string) =>
    api.get<{ success: boolean; data: Post & { comments: Comment[] } }>(`/posts/${id}`),

  createPost: (data: { content: string; tags?: string[] }) =>
    api.post<{ success: boolean; data: Post }>('/posts', data),

  deletePost: (id: string) =>
    api.delete(`/posts/${id}`),

  likePost: (id: string) =>
    api.post<{ success: boolean; isLiked: boolean }>(`/posts/${id}/like`),

  addComment: (id: string, content: string) =>
    api.post<{ success: boolean; data: Comment }>(`/posts/${id}/comments`, { content })
};
