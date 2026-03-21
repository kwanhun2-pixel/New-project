import { Router } from 'express';
import { getJobs, getJob, applyToJob, getMyApplications, createJob } from '../controllers/job.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, getJobs);
router.post('/', authenticate, createJob);
router.get('/my-applications', authenticate, getMyApplications);
router.get('/:id', authenticate, getJob);
router.post('/:id/apply', authenticate, applyToJob);

export default router;
