import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  features: [{
    type: {
      type: String,
      enum: ['text', 'image', 'dropdown'],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    options: [{
      type: String,
      required: function() {
        return this.type == 'dropdown';
      },
    }],
  }],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Service = model('Service', serviceSchema);

// Function to find all services
export async function find() {
  try {
    const services = await Service.find();
    return services;
  } catch (error) {
    throw new Error('Failed to find services');
  }
}

// Function to create a new service
export async function create(serviceData) {
  try {
    const service = new Service(serviceData);
    const createdService = await service.save();
    return createdService;
  } catch (error) {
    throw new Error('Failed to create service');
  }
}

// Function to find a service by ID
export async function findById(id) {
  try {
    const service = await Service.findById(id);
    return service;
  } catch (error) {
    throw new Error('Failed to find service by ID');
  }
}