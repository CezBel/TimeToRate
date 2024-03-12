import express from 'express';
const router = express.Router();
import { admin, protect } from '../middleware/authMiddleware.js'
import { 
  getBusinesses, 
  getBusinessById, 
  createBusinessReview, 
  getMyReviews, 
  getReviews, 
  createBusiness, 
  updateBusiness, 
  deleteBusiness,
  getTopBuisnesses
} from '../controllers/businessController.js';

router.get('/', getBusinesses);
router.get('/top', getTopBuisnesses);
router.post('/',protect, admin, createBusiness);
router.get('/reviews', protect, admin, getReviews);
router.route('/:id').get(getBusinessById).put(protect, admin, updateBusiness).delete(protect, admin, deleteBusiness);
router.get('/profile/myreviews', protect, getMyReviews);
router.post('/:id/reviews', protect, createBusinessReview);

export default router;