const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors'); // Ye line add karein
const authRoutes = require('./Routes/auth'); // Path check kar lein
// Backend ki main file mein check karein
const serviceRoutes = require('./Routes/serviceRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const bookingRoutes = require("./Routes/booking");
const reviewRoutes = require("./Routes/review");
const dashboardRoutes = require("./Routes/dashboard");


// Load env vars
dotenv.config();

// Database se connect karein
connectDB();

const app = express();
// Is line ko routes se PEHLE likhna zaroori hai
app.use(cors());

// Body parser (JSON data handle karne ke liye)
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
// Yeh line check karein ke kya yahan '/api/services' likha hai?
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/dashboard", dashboardRoutes);



const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});