import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';

import authRoutes from './Routes/auth.js';
import serviceRoutes from './Routes/serviceRoutes.js';
import categoryRoutes from './Routes/categoryRoutes.js';
import bookingRoutes from './Routes/booking.js';
import reviewRoutes from './Routes/review.js';
import dashboardRoutes from './Routes/dashboard.js';

// Load env vars
dotenv.config();

// Database se connect karein
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Test route
app.get("/", (req, res) => {
    res.status(200).send("service booking Backend is Live and Running!");
});

// SERVER
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;