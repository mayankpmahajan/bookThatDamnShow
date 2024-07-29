import express from 'express';
import User from '../models/user';
import { verifyToken } from '../middleware/authMiddleware';


const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json({ message: 'This is a protected route', user });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
});

export default router;