import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

// Secret key for JWT
const SECRET_KEY = JWT_SECRET; // Replace with your own secret key

// Generate JWT token
export function generateToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}
