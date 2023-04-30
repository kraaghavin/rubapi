//middleware/auth.js
import { verifyToken } from '../utils/auth';


// Middleware to authenticate user using JWT token
export function authenticateUser(req, res, next) {
// Get the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
    }
}


export async function getCurrentUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);
        const user = decodedToken.user;
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