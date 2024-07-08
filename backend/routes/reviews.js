import express from 'express';
import { createReview} from '../controllers/reviewController.js';
import { verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/:tourId', verifyUser, createReview); // Only authenticated users can create reviews
//router.put('/:id', verifyUser, updateReview); // Only the user or admin can update a review
//router.delete('/:id', verifyUser, deleteReview); // Only the user or admin can delete a review
//router.get('/:tourId', getReviews); // Public route to get all reviews for a tour

export default router;
