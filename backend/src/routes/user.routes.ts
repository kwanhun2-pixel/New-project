import { Router } from 'express';
import {
  getProfile, updateProfile, searchUsers, getConnections,
  sendConnection, respondToConnection
} from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/search', authenticate, searchUsers);
router.get('/:id', authenticate, getProfile);
router.put('/me', authenticate, updateProfile);
router.get('/:id/connections', authenticate, getConnections);
router.post('/:toUserId/connect', authenticate, sendConnection);
router.put('/connections/:fromUserId/respond', authenticate, respondToConnection);

export default router;
