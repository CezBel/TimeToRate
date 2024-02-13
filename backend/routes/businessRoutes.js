import express from 'express';
const router = express.Router();
import { getBusinesses, getBusinessById } from '../controllers/businessController.js';

router.get('/', getBusinesses);
router.get('/:id', getBusinessById);

export default router;