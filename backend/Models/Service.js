const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        // enum: ['Repair', 'Cleaning', 'Maintenance', 'Salon', 'Electrical'], // Aap apni marzi se categories add kr skti hain
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    image: {
        type: String, // Yahan image ka URL ya file path save hoga
        default: 'https://via.placeholder.com/600x400'
    },
    rating: {
        type: Number,
        default: 4.5
    },
    reviewsCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports =
  mongoose.models.Service ||
  mongoose.model('Service', ServiceSchema);