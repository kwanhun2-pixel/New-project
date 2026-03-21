import { Response } from 'express';
import { prisma } from '../models/prisma';
import { AuthRequest } from '../types';
import { getPagination } from '../utils/pagination';

export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { content, tags } = req.body;
    const post = await prisma.post.create({
      data: { content, tags: tags || [], userId: req.user!.id },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true, headline: true } },
        _count: { select: { likes: true, comments: true } }
      }
    });
    res.status(201).json({ success: true, data: post });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const getFeed = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page, limit } = req.query as Record<string, string>;
    const { take, skip } = getPagination(page, limit);
    const userId = req.user!.id;

    // Get connected user IDs
    const connections = await prisma.connection.findMany({
      where: {
        OR: [{ fromUserId: userId }, { toUserId: userId }],
        status: 'ACCEPTED'
      }
    });

    const connectedIds = connections.map(c =>
      c.fromUserId === userId ? c.toUserId : c.fromUserId
    );
    connectedIds.push(userId);

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { userId: { in: connectedIds } },
        include: {
          user: { select: { id: true, name: true, avatarUrl: true, headline: true } },
          _count: { select: { likes: true, comments: true } },
          likes: { where: { userId }, select: { userId: true } }
        },
        orderBy: { createdAt: 'desc' },
        take,
        skip
      }),
      prisma.post.count({ where: { userId: { in: connectedIds } } })
    ]);

    const postsWithLikeStatus = posts.map(p => ({
      ...p,
      isLiked: p.likes.length > 0,
      likes: undefined
    }));

    res.json({ success: true, data: { posts: postsWithLikeStatus, total, page: parseInt(page || '1'), limit: take } });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const getPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true, headline: true } },
        comments: {
          include: { user: { select: { id: true, name: true, avatarUrl: true } } },
          orderBy: { createdAt: 'asc' }
        },
        _count: { select: { likes: true, comments: true } },
        likes: { where: { userId: req.user!.id }, select: { userId: true } }
      }
    });

    if (!post) {
      res.status(404).json({ success: false, error: '게시글을 찾을 수 없습니다' });
      return;
    }

    res.json({ success: true, data: { ...post, isLiked: post.likes.length > 0, likes: undefined } });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const likePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: postId } = req.params;
    const userId = req.user!.id;

    const existing = await prisma.like.findUnique({ where: { postId_userId: { postId, userId } } });

    if (existing) {
      await prisma.like.delete({ where: { postId_userId: { postId, userId } } });
      res.json({ success: true, message: '좋아요를 취소했습니다', isLiked: false });
    } else {
      await prisma.like.create({ data: { postId, userId } });
      const post = await prisma.post.findUnique({ where: { id: postId }, select: { userId: true } });
      if (post && post.userId !== userId) {
        await prisma.notification.create({
          data: {
            targetId: post.userId,
            actorId: userId,
            type: 'POST_LIKE',
            message: '게시글에 좋아요를 눌렀습니다',
            link: `/posts/${postId}`
          }
        });
      }
      res.json({ success: true, message: '좋아요를 눌렀습니다', isLiked: true });
    }
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: postId } = req.params;
    const { content } = req.body;
    const userId = req.user!.id;

    const comment = await prisma.comment.create({
      data: { postId, userId, content },
      include: { user: { select: { id: true, name: true, avatarUrl: true } } }
    });

    const post = await prisma.post.findUnique({ where: { id: postId }, select: { userId: true } });
    if (post && post.userId !== userId) {
      await prisma.notification.create({
        data: {
          targetId: post.userId,
          actorId: userId,
          type: 'POST_COMMENT',
          message: '게시글에 댓글을 남겼습니다',
          link: `/posts/${postId}`
        }
      });
    }

    res.status(201).json({ success: true, data: comment });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};

export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      res.status(404).json({ success: false, error: '게시글을 찾을 수 없습니다' });
      return;
    }
    if (post.userId !== req.user!.id) {
      res.status(403).json({ success: false, error: '권한이 없습니다' });
      return;
    }

    await prisma.post.delete({ where: { id } });
    res.json({ success: true, message: '게시글이 삭제되었습니다' });
  } catch {
    res.status(500).json({ success: false, error: '서버 오류가 발생했습니다' });
  }
};
