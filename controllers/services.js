import { find, create, findById } from '../models/Service.js';

// GET /api/services
export async function getServices(req, res, next) {
  try {
    const services = await find();
    res.json(services);
  } catch (error) {
    next(error);
  }
}

// POST /api/services
export async function createService(req, res, next) {
  try {
    const { name, description, price } = req.body;
    const service = await create({ name, description, price });
    res.json(service);
  } catch (error) {
    next(error);
  }
}

// GET /api/services/:id
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

// PUT /api/services/:id
export async function updateServiceById(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(updatedService);
  } catch (error) {
    next(error);
  }
}

// DELETE /api/services/:id
export async function deleteServiceById(req, res, next) {
  try {
    const { id } = req.params;
    const deletedService = await Service.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
}
