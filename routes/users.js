//routes/users.js
import { Router } from 'express';
const userRoutes = Router();
import { authenticateUser } from '../middleware/auth';
import { getUsers, getUserById, updateUserById, createUser, deleteUserById } from '../controllers/users';

userRoutes.post('/', createUser);
userRoutes.get('/:id', authenticateUser, getUserById);
userRoutes.put('/:id', authenticateUser, updateUserById);
userRoutes.delete('/:id', authenticateUser, deleteUserById);
userRoutes.get('/', authenticateUser, getUsers);

export default userRoutes;