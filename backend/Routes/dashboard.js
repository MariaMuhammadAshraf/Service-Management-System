const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Service = require("../Models/Service");
const Booking = require("../Models/Booking");

// ✅ ADMIN DASHBOARD STATS
router.get("/admin-stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });
    
    // ⬇️ YE LINE ADD KI HAI: Providers ko count karne ke liye
    const totalProviders = await User.countDocuments({ role: "provider" }); 
    
    const totalServices = await Service.countDocuments();
    const totalBookings = await Booking.countDocuments();
    
    const completedBookings = await Booking.find({ status: "Completed" })
      .populate("serviceId", "price");

    const totalRevenue = completedBookings.reduce(
      (sum, b) => sum + (b.serviceId?.price || 0),
      0
    );

    const monthlyRevenue = {};
    completedBookings.forEach((b) => {
      const month = new Date(b.createdAt).toLocaleString("default", {
        month: "short"
      });
      monthlyRevenue[month] =
        (monthlyRevenue[month] || 0) + (b.serviceId?.price || 0);
    });

    // ✅ Response mein totalProviders bhej rahe hain
    res.json({
      totalUsers,
      totalProviders, // Ab frontend ko data milega
      totalServices,
      totalBookings,
      totalRevenue,
      monthlyRevenue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Provider Dashboard Data
router.get("/:id", async (req, res) => {
  try {
  // Yahan .populate() add kiya hai
    const jobs = await Booking.find({ providerId: req.params.id })
      .populate('serviceId', 'title') // Sirf title le aayega
      .populate('userId', 'name');    // Sirf name le aayega
    const stats = {
      total: jobs.length,
      inProgress: jobs.filter(j => j.status === "In Progress").length,
      completed: jobs.filter(j => j.status === "Completed").length,
      jobs: jobs
    };
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;