import express from 'express';
import { createBooking,getBooking,getAllBooking} from '../controllers/bookingController.js';
import { verifyUser,verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyUser, createBooking); // Only authenticated users can create reviews
//router.put('/:id', verifyUser, updateReview); // Only the user or admin can update a review
router.get('/', verifyUser, getBooking); // Only the user or admin can delete a review
router.get('/:id', verifyAdmin,getAllBooking); // Public route to get all reviews for a tour

export default router;
