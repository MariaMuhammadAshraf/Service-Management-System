const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const authRoutes = require('./Routes/auth');
const serviceRoutes = require('./Routes/serviceRoutes');
const categoryRoutes = require('./Routes/categoryRoutes');
const bookingRoutes = require('./Routes/booking');
const reviewRoutes = require('./Routes/review');
const dashboardRoutes = require('./Routes/dashboard');

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

// Ek hi clean test route rakhein
app.get("/", (req, res) => {
    res.status(200).send("service booking Backend is Live and Running!");
});

// SERVER (Vercel ke liye app.listen ko condition mein daalein)
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;