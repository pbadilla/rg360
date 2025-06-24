import { Router } from 'express';
import mongoose from 'mongoose';
import {
  addUser, getAllUsers, getUserById,
  updateUsers, deleteUserById, loginUser,
} from '@/controllers/users';
import { requestPasswordReset, resetPassword } from '@/controllers/passwords';

import { authMiddleware } from '@/middleware/auth';


const router = Router();

/** Middleware to check DB connection */
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Service Unavailable. Database not connected.' });
  }
  next();
});

/** Users Routes */
router.post('/', addUser);
router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUsers);
router.delete('//:userId', deleteUserById);

/** Login and PWD Routes */
router.post('/auth/login',authMiddleware, loginUser);
router.post('/auth/request-password-reset',authMiddleware, requestPasswordReset);
router.post('/auth/reset-password',authMiddleware, resetPassword);

export default router;
