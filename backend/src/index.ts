import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import jobRoutes from './routes/job.routes';
import { prisma } from './models/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:4173'
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/jobs', jobRoutes);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// 404
app.use((_req, res) => res.status(404).json({ success: false, error: '경로를 찾을 수 없습니다' }));

const start = async () => {
  try {
    await prisma.$connect();
    console.log('데이터베이스 연결 성공');
    app.listen(PORT, () => console.log(`서버 실행 중: http://localhost:${PORT}`));
  } catch (error) {
    console.error('서버 시작 실패:', error);
    process.exit(1);
  }
};

start();
