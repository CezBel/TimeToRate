import express from 'express';
import { 
  loginUser, 
  registerUser, 
  logoutUser, 
  getUserProfile, 
  updateUserProfile, 
  getUsers, 
  getUserById,
  deleteUser, 
  updateUser  
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Admin Routes
router.get('/', protect, admin, getUsers);
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUser).delete(protect, admin, deleteUser);

export default router;