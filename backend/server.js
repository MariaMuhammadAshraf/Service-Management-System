const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const authRoutes = require('./Routes/auth');
const serviceRoutes = require('./Routes/serviceRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
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

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("API is running...");
});

// SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
    res.status(200).send("service booking Backend is Live and Running!");
});
export default app;