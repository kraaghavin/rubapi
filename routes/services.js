import { Router } from 'express';
const serviceRoutes = Router();
import { authenticateUser } from '../middleware/auth';
import { createService, getServices, getServiceById, updateServiceById, deleteServiceById } from '../controllers/services';

serviceRoutes.post('/', authenticateUser, createService);
serviceRoutes.get('/', getServices);
serviceRoutes.get('/:id', getServiceById);
serviceRoutes.put('/:id', authenticateUser, updateServiceById);
serviceRoutes.delete('/:id', authenticateUser, deleteServiceById);

export default serviceRoutes;
