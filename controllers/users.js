// controllers/users.js

import { create, findById, findAll, updateById, deleteById } from '../models/User.js'; // Update the import statement

import { generateToken } from '../utils/auth.js'; // Import the function to generate JWT token

// POST /api/users
export async function createUser(req, res, next) {
  try {
    const { username,  email, password, role} = req.body;
    const user = await create({ username, email, password , role});
    const userId = user._id.toString();
    // Generate JWT token for the registered user
    const token = generateToken({name: user.username, email: user.email, user: userId, role: user.role, createdAt: user.createdAt }); // Assuming user._id is the ID of the registered user
    res.json({ user, token }); // Return the user and token in the response
  } catch (error) {
    next(error);
  }
}

// GET /api/users
export async function getUsers(req, res, next) {
  try {
    const users = await findAll(); // Update function call
    res.json(users);
  } catch (error) {
    next(error);
  }
}

// GET /api/users/:id
export async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const user = await findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
}

// DELETE /api/users/:id
export async function deleteUserById(req, res, next) {
  try {
    const { id } = req.params;
    const deletedUser = await deleteById(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(deletedUser);
  } catch (error) {
    next(error);
  }
}

// PUT /api/users/:id
export async function updateUserById(req, res, next) {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const updatedUser = await updateById(id, { username, email, role });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
}
