import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const register = async (req, res) => {
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            photo: req.body.photo,
        });

        await newUser.save();
        res.status(200).json({ success: true, message: "Successfully created" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to create. Try again" });
    }
};

// Login an existing user
export const login = async (req, res) => {
    try {
        // Check if the user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        // Validate the password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).json({ success: false, message: "Invalid password" });

        // Generate a JWT token
        const {password,role,...rest} = user._doc
        const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '15d' });



        // Return the token and user details
        res.cookie('accessToken',token,{
            httpOnly:true,
            expires:token.expiresIn
        }).status(200).json({ 
            token,
            role,
            data:{...rest},
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to login. Try again" });
    }
};
