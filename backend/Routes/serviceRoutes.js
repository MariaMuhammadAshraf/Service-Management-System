// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const Service = require('../Models/service.js');

// GET: All Services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST: Add Service (Admin)
router.post('/', async (req, res) => {
    const service = new Service(req.body);
    try {
        const newService = await service.save();
        res.status(201).json(newService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT: Update Service
router.put('/:id', async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedService);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE: Remove Service
router.delete('/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: "Service Deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;