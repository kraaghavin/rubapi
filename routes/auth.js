import { Router } from 'express';
const authRoutes = Router();
import  {login} from '../controllers/auth.js';

authRoutes.post('/login', login);

export default authRoutes;
