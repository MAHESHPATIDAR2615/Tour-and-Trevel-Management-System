import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';

import bookingRoute from './routes/bookings.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGO_URI;

const corsOptions={
    origin:true,
    credentials:true,
}
mongoose.set("strictQuery",false);


// Database connection
const connect = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB database connected');
    } catch (err) {
        console.error('MongoDB database connection failed:', err.message);
    }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/tours',tourRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/review',reviewRoute);
app.use('/api/v1/boking',bookingRoute);
// Route for testing
app.get("/", (req, res) => {
    res.send("API is working");
});

// Start server and connect to database
app.listen(port, () => {
    connect();
    console.log('Server listening on port', port);
});
