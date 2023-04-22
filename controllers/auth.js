import { generateToken } from '../utils/auth.js';
import { findOne } from '../models/User.js';
import { hashPassword, verifyPassword } from '../utils/password.js';

export async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // const hashPwd = hashPassword(password);
    const isMatch = await verifyPassword(password, user.password);
//console.log(password + " " + user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = generateToken({ user: { email: user._id } });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
}
