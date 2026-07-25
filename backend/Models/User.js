 

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },

    role: { 
        type: String, 
        enum: ['user', 'admin', 'provider'], 
        default: 'user' 
    },
    isAvailable: {
  type: Boolean,
  default: true
         },

    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'approved'
    },
    status: { type: String, default: "active" },
    isBlocked: { type: Boolean, default: false }

}, { timestamps: true });

export default mongoose.model('User', userSchema);