//utils/auth.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';

// Secret key for JWT
const SECRET_KEY = JWT_SECRET; // Replace with your own secret key

// Generate JWT token
export function generateToken(payload) {
  //console.log(payload+ "payload in utils");
return jwt.sign(payload, SECRET_KEY);
}

// Verify JWT token
export function verifyToken(token) {
  //console.log(token+ " token in utils");
  return jwt.verify(token, SECRET_KEY);
}