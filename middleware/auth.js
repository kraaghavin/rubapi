//middleware/auth.js
import { JWT_SECRET } from '../config/env';
import { verifyToken } from '../utils/auth';
import { findById, findOne } from '../models/User';

// Secret key for JWT
const SECRET_KEY = JWT_SECRET; // Replace with your own secret key

// Middleware to authenticate user using JWT token
export function authenticateUser(req, res, next) {
// Get the token from the request headers
const token = req.headers.authorization?.split(' ')[1];
console.log(token + "token in middleware");

if (!token) {
return res.status(401).json({ message: 'Token not found' });
}

try {
const decoded = verifyToken(token);
req.user = decoded;

next();
} catch (error) {
// console.log(error + "error decoded in middleware");
console.error(error);
res.status(401).json({ message: 'Invalid token' });
}
}


export async function getCurrentUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        const user = decodedToken.user;
        console.log(user + ' decoded token');
        // const userByMail = await findById({ user});
        // console.log(userByMail + 'by mail');
        if (user) {
            // Exclude password field from user object
            // const { password, ...userWithoutPassword } = user;
            // return userWithoutPassword;
            return user;
          } else {
            throw new Error('User not found');
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}