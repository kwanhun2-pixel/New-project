export interface User {
  id: string;
  email: string;
  name: string;
  headline?: string;
  bio?: string;
  avatarUrl?: string;
  university?: string;
  major?: string;
  graduationYear?: number;
  location?: string;
  website?: string;
  createdAt: string;
  _count?: {
    connectionsFrom: number;
    posts: number;
  };
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location?: string;
}

export interface Education {
  id: string;
  school: string;
  degree?: string;
  field?: string;
  startYear: number;
  endYear?: number;
  isCurrent: boolean;
  gpa?: number;
  description?: string;
}

export interface Skill {
  skill: { id: string; name: string; category?: string };
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  imageUrl?: string;
  isCurrent: boolean;
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  createdAt: string;
  user: Pick<User, 'id' | 'name' | 'avatarUrl' | 'headline'>;
  _count: { likes: number; comments: number };
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: Pick<User, 'id' | 'name' | 'avatarUrl'>;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  description: string;
  requirements: string[];
  salary?: string;
  type: 'INTERNSHIP' | 'PART_TIME' | 'FULL_TIME' | 'CONTRACT' | 'VOLUNTEER';
  isRemote: boolean;
  tags: string[];
  applyUrl?: string;
  deadline?: string;
  createdAt: string;
  _count?: { applications: number };
  hasApplied?: boolean;
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
  actor?: Pick<User, 'id' | 'name' | 'avatarUrl'>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
