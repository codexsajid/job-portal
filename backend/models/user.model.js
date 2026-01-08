import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'recruiter'],
        required: true
    },

    // OTP
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    otpVerify: { type: Boolean, default: false },

    profile: {
        profilePhoto: { type: String, default: '' },
        bio: { type: String, default: '' },
        skills: { type: [String], default: [] },
        resume: { type: String, default: '' },
        resumeOriginalName: { type: String, default: '' },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
    }
}, {
    timestamps: true
});


export const User = mongoose.model("User", userSchema);
