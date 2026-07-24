const express = require('express');
const router = express.Router();
const Category = require('../Models/Category');

// 1. GET: Saari categories mangwane ke liye
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
});

// 2. POST: Nayi category add karne ke liye
router.post('/', async (req, res) => {
    try {
        const newCat = new Category(req.body);
        await newCat.save();
        res.status(201).json(newCat);
    } catch (err) { 
        res.status(400).json({ message: "Category already exists or invalid data" }); 
    }
});

// 3. PUT: Category edit karne ke liye (Dynamic Edit)
router.put('/:id', async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id, 
            { name: req.body.name }, 
            { new: true }
        );
        res.json(updatedCategory);
    } catch (err) { 
        res.status(400).json({ message: err.message }); 
    }
});

// 4. DELETE: Category khatam karne ke liye
router.delete('/:id', async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ message: "Category Deleted Successfully" });
    } catch (err) { 
        res.status(500).json({ message: err.message }); 
    }
});

module.exports = router;