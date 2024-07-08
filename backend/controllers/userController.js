import User from '../models/User.js';

// Create a new user
export const createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json({
            success: true,
            message: "Successfully created",
            data: savedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create. Try again",
        });
    }
};

// Update an existing user
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Successfully updated",
            data: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update",
        });
    }
};

// Delete a user
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);

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

// Get a single user by ID
export const getSingleUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Successful",
            data: user,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user",
        });
    }
};

// Get all users
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({
            success: true,
            message: "Successful",
            data: users,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
        });
    }
};
