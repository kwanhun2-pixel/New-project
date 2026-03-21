import { Router } from 'express';
import { createPost, getFeed, getPost, likePost, addComment, deletePost } from '../controllers/post.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/feed', authenticate, getFeed);
router.post('/', authenticate, createPost);
router.get('/:id', authenticate, getPost);
router.delete('/:id', authenticate, deletePost);
router.post('/:id/like', authenticate, likePost);
router.post('/:id/comments', authenticate, addComment);

export default router;
