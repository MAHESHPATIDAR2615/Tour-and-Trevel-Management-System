import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
    const tourId = req.params.tourId;
    const newReview = new Review({ ...req.body, tour: tourId, user: req.user.id });

    try {
        const savedReview = await newReview.save();
        
        // Update the tour with the new review
        await Tour.findByIdAndUpdate(tourId, { $push: { reviews: savedReview._id } });

        res.status(200).json({
            success: true,
            message: "Review submitted",
            data: savedReview,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to submitted review. Try again",
        });
    }
};
