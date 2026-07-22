const express = require("express");
const router = express.Router();
const Booking = require("../Models/Booking");
const User = require("../Models/User");
const Service = require("../Models/service.js");

// ✅ CREATE BOOKING (User Side Later)
router.post("/", async (req, res) => {
  try {
    const { userId, serviceId, date, time } = req.body;

    const newBooking = new Booking({
      userId,
      serviceId,
      date,
      time,
    });

    await newBooking.save();
    res.status(201).json({ message: "Booking created successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ✅ GET ALL BOOKINGS (Admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("serviceId", "title")
      .populate("providerId", "name");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE STATUS
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    await Booking.findByIdAndUpdate(req.params.id, { status });
    res.json({ message: "Status updated successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ ASSIGN PROVIDER
router.put("/:id/assign", async (req, res) => {
  try {
    const { providerId } = req.body;

    await Booking.findByIdAndUpdate(req.params.id, {
      providerId,
      status: "Confirmed",
    });

    res.json({ message: "Provider assigned successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET BOOKINGS BY USER
router.get("/user/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("serviceId", "title price")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ✅ PROVIDER: Get Assigned Bookings
router.get("/provider/:providerId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      providerId: req.params.providerId
    })
      .populate("userId", "name")
      .populate("serviceId", "title price")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ✅ PROVIDER: Update Booking Status
router.put("/:id/provider-status", async (req, res) => {
  try {
    const { status, providerId } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking || booking.providerId.toString() !== providerId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Status updated ✅" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ✅ ADMIN: Delete Booking
router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ✅ ADMIN: Soft Cancel Booking
router.put("/:id/cancel", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: "Cancelled"
    });

    res.json({ message: "Booking cancelled ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ✅ ADMIN: Archive Booking
router.put("/:id/archive", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: "Archived"
    });

    res.json({ message: "Booking archived ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ✅ ADMIN: Restore Archived Booking
router.put("/:id/restore", async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.id, {
      status: "Pending"
    });

    res.json({ message: "Booking restored ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const now = new Date();
    const bookingDate = new Date(booking.date);

    const diffHours = (bookingDate - now) / (1000 * 60 * 60);

    if (diffHours < 24) {
      return res.status(400).json({
        message: "Cancellation allowed only 24h before service"
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled ✅" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;