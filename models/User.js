//models/User.js
import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const User = model('User', userSchema);

// Define and export the findOne function
export async function findOne(query) {
  try {
    const user = await User.findOne(query);
    return user;
  } catch (error) {
    console.err(error);

    throw error;
  }
}

export async function findAll(id) {
  try {
    const user = await User.findAll(id);
    return user;
  } catch (error) {
    console.err(error);

    throw error;
  }
}

export async function findById(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.err(error);

    throw error;
  }
}

export async function updateById(id) {
  try {
    const user = await User.upd(id);
    return user;
  } catch (error) {
    console.err(error);

    throw error;
  }
}


// Define and export the create function
export async function create(data) {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    console.err(error);

    throw error;
  }
}

export default User;