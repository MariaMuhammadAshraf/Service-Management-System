const express = require("express");
const router = express.Router();
const Review = require("../Models/Review");
const Booking = require("../Models/Booking");
const Service = require("../Models/Service");

/* ==============================
   ✅ USER: GET HIS APPROVED REVIEWS
================================ */
router.get("/user/:userId", async (req, res) => {
  try {
    const reviews = await Review.find({
      userId: req.params.userId,
      status: "approved"
    })
      .populate("serviceId", "title")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ==============================
   ✅ CREATE OR UPDATE REVIEW
================================ */
router.post("/", async (req, res) => {
  try {
    const { userId, serviceId, rating, comment } = req.body;

    // ✅ Check completed booking
    const booking = await Booking.findOne({
      userId,
      serviceId,
      status: "Completed"
    });

    if (!booking) {
      return res.status(400).json({
        message: "You can only review completed services"
      });
    }

    // ✅ If review already exists → update it instead of blocking
    let existingReview = await Review.findOne({
      userId,
      serviceId
    });

    if (existingReview) {
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.status = "pending"; // reset for admin approval
      await existingReview.save();

      return res.json({
        message: "Review updated ✅ (Waiting for admin approval)"
      });
    }

    // ✅ Create new review
    const newReview = new Review({
      userId,
      serviceId,
      providerId: booking.providerId,
      rating,
      comment
    });

    await newReview.save();

    res.status(201).json({
      message: "Review submitted ✅ (Waiting for admin approval)"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ==============================
   ✅ ADMIN: GET ALL REVIEWS
================================ */
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "name email")
      .populate("serviceId", "title")
      .populate("providerId", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ==============================
   ✅ ADMIN: APPROVE REVIEW
================================ */
router.put("/:id/approve", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true }
    );

    // ✅ Update service rating after approval
    const approvedReviews = await Review.find({
      serviceId: review.serviceId,
      status: "approved"
    });

    const avg =
      approvedReviews.reduce((acc, r) => acc + r.rating, 0) /
      approvedReviews.length;

    await Service.findByIdAndUpdate(review.serviceId, {
      rating: avg,
      reviewsCount: approvedReviews.length
    });

    res.json({ message: "Review approved ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ==============================
   ✅ ADMIN: REJECT REVIEW
================================ */
router.put("/:id/reject", async (req, res) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, {
      status: "rejected"
    });

    res.json({ message: "Review rejected ❌" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ==============================
   ✅ ADMIN: DELETE REVIEW
================================ */
router.delete("/:id", async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted 🗑️" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ==============================
   ✅ PROVIDER: GET APPROVED REVIEWS
================================ */
router.get("/provider/:providerId", async (req, res) => {
  try {
    const reviews = await Review.find({
      providerId: req.params.providerId,
      status: "approved"
    })
      .populate("userId", "name")
      .populate("serviceId", "title")
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ✅ PROVIDER: Reply to Review
router.put("/:id/reply", async (req, res) => {
  try {
    const { reply } = req.body;

    await Review.findByIdAndUpdate(req.params.id, {
      reply
    });

    res.json({ message: "Reply added ✅" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// ✅ PROVIDER REPLY
router.put("/:id/reply", async (req, res) => {
  try {
    const { reply } = req.body;

    await Review.findByIdAndUpdate(req.params.id, { reply });

    res.json({ message: "Reply added ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ PROVIDER REPORT REVIEW
router.put("/:id/report", async (req, res) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, { reported: true });

    res.json({ message: "Review reported ⚠️" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;