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

dotenv.config();
connectDB();

const app = express();

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "https://service-management-system-orpin.vercel.app");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
    
//     if (req.method === "OPTIONS") {
//         return res.status(200).end();
//     }
//     next();
// });

// // app.use(cors());
// // 2. Standard CORS package
// app.use(cors({
//     origin: "https://service-management-system-orpin.vercel.app",
//     credentials: true
// }));

// app.use(express.json());

app.use(cors({
    origin: ["https://service-management-system-orpin.vercel.app", "https://service-management-system-ywma.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ Bulletproof DB Middleware: Har request se pehle DB connection ensure karega
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database Connection Middleware Error:", error);
        return res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});
 

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get("/", (req, res) => {
    res.status(200).send("service booking Backend is Live and Running!");
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;