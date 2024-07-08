import Tour from '../models/Tour.js';

// Create a new tour
export const createTour = async (req, res) => {
    const newTour = new Tour(req.body);
    try {
        const savedTour = await newTour.save();
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
        });
    }
};

// Update an existing tour
export const updateTour = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedTour = await Tour.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
};

// Delete a tour
export const deleteTour = async (req, res) => {
    try {
        const id = req.params.id;
        await Tour.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Successfully deleted",
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete",
        });
    }
};

// Get a single tour by ID
export const getSingleTour = async (req, res) => {
    try {
        const id = req.params.id;
        const tour = await Tour.findById(id).populate('reviews');

        if (!tour) {
            return res.status(404).json({
                success: false,
                message: "Tour not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successful",
            data: tour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tour",
        });
    }
};

// Get all tours
export const getAllTour = async (req, res) => {

    const page = parseInt(req.query.page);
    try {
        const tours = await Tour.find({}).populate('reviews').skip(page*8).limit(8);
        res.status(200).json({
            success: true,
            count: tours.length,
            message:"Successful",
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tours",
        });
    }
};

export const getTourBySearch=async(req,res)=>{

    const city=new RegExp(req.query.city,'i')
    const distance=new parseInt(req.query.distance)
    const maxGroupSize=new parseInt(req.query.maxGroupSize)
    try{
        const tours=await Tour.find({city,distance:{$gte:distance},maxGroupSize:{$gte:maxGroupSize}}).populate('reviews')
        res.status(200).json({
            success: true,
            message:"Successful",
            data: tours,
        });
    }catch (err) {
        res.status(404).json({
            success: false,
            message: "not found",
        });
    }

}


export const getFeaturedTour = async (req, res) => {

    try {
        const tours = await Tour.find({featured:true}).populate('reviews').limit(8);
        res.status(200).json({
            success: true,
            message:"Successful",
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve tours",
        });
    }
};


export const getTourCount= async (req, res) => {

    try {
        const tours = await Tour.estimatedDocumentCount();
        res.status(200).json({
            success: true,
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch",
        });
    }
};
