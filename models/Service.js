import { Schema, model } from 'mongoose';

const serviceSchema = new Schema({
  title: {
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
  duration: {
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
  imageGallery: [{
    type: String,
  }],
  reviews: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  }],
  customizationOptions: [{
    type: {
      type: String,
      required: true,
    },
    options: [{
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    }],
  }],
});

const Service = model('Service', serviceSchema);

export async function findOne(query) {
  try {
    const service = await Service.findOne(query);
    return service;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function findAll() {
  try {
    const services = await Service.find();
    return services;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function findById(id) {
  try {
    const service = await Service.findById(id);
    return service;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateById(id, data) {
  try {
    const service = await Service.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    });
    return service;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function create(data) {
  try {
    const services = new Service(data);
    await services.save();
    return services;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteById(id) {
  try {
    const service = await Service.findByIdAndDelete(id);
    return service;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default Service;