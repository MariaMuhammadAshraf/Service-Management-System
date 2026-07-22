const express = require('express');
const router = express.Router();
// Agar folder ka naam 'models' hai aur file 'User.js'
const User = require('../Models/User');
const bcrypt = require('bcryptjs');

// // --- SIGNUP ROUTE ---
// router.post('/signup', async (req, res) => {
//     try {
//         const { name, email, password, phone, role } = req.body;

//         // Check agar user pehle se exist karta hai
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: "User already exists!" });

//         // Password Hash karna (Security ke liye)
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // const newUser = new User({
//         //     name,
//         //     email,
//         //     password: hashedPassword,
//         //     phone,
//         //     role: role || 'user'
//         // });
// const newUser = new User({
//     name,
//     email,
//     password: hashedPassword,
//     phone,
//     role: role || 'user',
//     status: role === 'provider' ? 'pending' : 'approved'
// });
//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully!", user: { name, email, role } });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// --- LOGIN ROUTE ---
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // User ko dhundna
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: "User not found!" });

//         // Password match karna
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

//         // Success response (JWT ke baghair hum user ka data bhej dete hain)
//         res.status(200).json({ 
//             message: "Login successful!", 
//             user: { id: user._id, name: user.name, email: user.email, role: user.role } 
//         });

//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }


    
// });

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, phone, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            role: role || "user",
            status: role === "provider" ? "pending" : "approved"
        });

        await newUser.save();

        res.status(201).json({
            message: role === "provider"
                ? "Provider registered! Wait for admin approval."
                : "User registered successfully!"
        });

    } catch (error) {
        console.error(error); // ✅ IMPORTANT
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // ✅ Check user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // ✅ Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // ✅ Provider approval check
        if (user.role === "provider" && user.status === "pending") {
            return res.status(403).json({
                message: "Your provider account is waiting for admin approval."
            });
        }

        if (user.role === "provider" && user.status === "rejected") {
            return res.status(403).json({
                message: "Your provider account has been rejected by admin."
            });
        }

        // ✅ Success login
        res.status(200).json({
            message: "Login successful!",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

  // ✅ GET ALL USERS (Only normal users)
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
// ✅ UPDATE USER
router.put('/users/:id', async (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, phone },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated successfully", user: updatedUser });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
// ✅ DELETE USER
router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

 // ✅ GET ALL PROVIDERS
router.get('/providers', async (req, res) => {
    try {
        const providers = await User.find({ role: 'provider' }).select('-password');
        res.status(200).json(providers);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
// ✅ APPROVE PROVIDER
router.put('/providers/:id/approve', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { status: 'approved' });
        res.status(200).json({ message: "Provider approved successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
// ✅ REJECT PROVIDER
router.put('/providers/:id/reject', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, { status: 'rejected' });
        res.status(200).json({ message: "Provider rejected successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
// ✅ DELETE PROVIDER
router.delete('/providers/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Provider deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ UPDATE PROFILE
router.put("/update-profile/:id", async (req, res) => {
  try {
    const { name, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET SINGLE USER (Profile Fetch)
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET SINGLE USER (Provider/Profile)
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ UPDATE PROVIDER PROFILE
router.put("/update-profile/:id", async (req, res) => {
  try {
    const { name, phone } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone },
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
 // ✅ GET ALL USERS (exclude providers/admin if needed)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ UPDATE USER
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ SOFT DELETE
router.put("/users/:id/deactivate", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "inactive"
    });
    res.json({ message: "User deactivated ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Activate User Route
router.put("/users/:id/activate", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      status: "active" // isko active kar dein
    });
    res.json({ message: "User activated ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ BLOCK / UNBLOCK
router.put("/users/:id/block", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: "User status updated ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ PROVIDER TOGGLE AVAILABILITY
router.put("/toggle-availability/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isAvailable = !user.isAvailable;
    await user.save();

    res.json({
      message: "Availability updated",
      isAvailable: user.isAvailable
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id/provider-status", async (req, res) => {
  const { status } = req.body;
  await Booking.findByIdAndUpdate(req.params.id, { status });
  res.json({ message: "Updated ✅" });
});
module.exports = router;