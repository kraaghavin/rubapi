import { Router } from 'express';
const userRoutes = Router();
import { authenticateUser } from '../middleware/auth';
import { getUsers, getUserById, updateUserById } from '../controllers/users';

userRoutes.get('/', authenticateUser, getUsers);
userRoutes.get('/:id', authenticateUser, getUserById);
userRoutes.put('/:id', authenticateUser, updateUserById);

export default userRoutes;
