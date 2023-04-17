// auth.js

import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { findOne } from '../models/User.js';
import { JWT_SECRET } from '../config/env';

// POST /api/auth/login
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    const isMatch = await user.checkPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    console.log(token);
    res.json({ token });
  } catch (error) {
    next(error);
  }
}