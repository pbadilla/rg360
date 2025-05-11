import { Router } from 'express';
import mongoose from 'mongoose';
import {
  addUser, getAllUsers, getUserById,
  updateUser, deleteUserById, loginUser,
} from '@/controllers/users';
import { requestPasswordReset, resetPassword } from '@/controllers/passwords';

import { authenticateJWT, requireAdmin } from '@/middleware/auth';


const router = Router();

/** Middleware to check DB connection */
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Service Unavailable. Database not connected.' });
  }
  next();
});

/** Users Routes */
router.post('/users', addUser);
router.get('/users', authenticateJWT, requireAdmin, getAllUsers);
router.get('/users/:userId', authenticateJWT, getUserById);
router.put('/users/:userId', authenticateJWT, updateUser);
router.delete('/users/:userId', authenticateJWT, requireAdmin, deleteUserById);

/** Login and PWD Routes */
router.post('/auth/login', loginUser);
router.post('/auth/request-password-reset', requestPasswordReset);
router.post('/auth/reset-password', resetPassword);

export default router;



