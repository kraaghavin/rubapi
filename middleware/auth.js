import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import { findById } from '../models/User.js';

export async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = verify(token, JWT_SECRET);
    const userId = decodedToken.userId;

    const user = await findById(userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
