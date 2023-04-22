import { create, findAll, findById, updateById, deleteById } from '../models/Service.js';
import { getCurrentUser } from '../middleware/auth.js';
import { findOne } from '../models/User.js';

  export async function createService(req, res, next) {
    try {
      const { title, description, price, duration } = req.body;
      const existingService = await findOne({ title });
      if (existingService) {
      throw new Error('Service with this title already exists');
      } else {
      const  userEmail  = getCurrentUser(req, res, next);
      const id = await userEmail;
      console.log(id);
      const user = await findOne({ _id: id });
      console.log(user);
      const createBy = user.username;
      console.log(createBy);
      
      const newService = await create({ title, description, price, createdBy : user, duration });
      res.json(newService);
  }
    } catch (error) {
      next(error);
    }
  }
  

  export async function getServices(req, res, next) {
  try {
    const services = await findAll();
    res.json(services);
  } catch (error) {
    next(error);
  }
  }

export async function getServiceById(req, res, next) {
  try {
    const { id } = req.params;
    const service = await findById(id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
}

export async function updateServiceById(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, price, duration } = req.body;
    const updatedService = await updateById(id, { title, description, price, duration });
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(updatedService);
  } catch (error) {
    next(error);
  }
}

export async function deleteServiceById(req, res, next) {
  try {
    const { id } = req.params;
    const deletedService = await deleteById(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(deletedService);
  } catch (error) {
    next(error);
  }
}
