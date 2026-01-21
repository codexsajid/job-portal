import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utile/cloudinary.js"
import getDataUri from "../utile/datauri.js";
import { generateOtp } from "./otp.controller.js";
import { sendOtpEmail, sendWelcomeEmail } from "../middleware/emailCode.js";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Some field is missing.",
                success: false,
            });
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        if (phoneNumber.toString().length !== 10) {
            return res.status(400).json({
                message: "Please provide 10 Digit Phone Number.",
                success: false,
            });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "User already exists with this email.",
                success: false,
            });
        }

        const otp = generateOtp()

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashPassword,
            role,
            otp,
            otpExpiry: Date.now() + 5 * 60 * 1000,
            profile: { profilePhoto: cloudResponse.secure_url }
        });
        if (!newUser) {
            return res.status(400).json({
                message: "User registration  failed.",
                success: false,
            });

        }
        await sendOtpEmail(newUser.email, newUser.fullname, otp);

        return res.status(201).json({
            message: "Account created. Check your email for OTP verification.",
            success: true,
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const verifySignupOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email & OTP required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found", success: false });

        if (user.otpVerify === true) {
            return res.status(400).json({ message: "Already verified", success: false });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: "OTP not generated", success: false });
        }

        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP expired", success: false });
        }

        // Mark verified
        user.otp = null;
        user.otpExpiry = null;
        user.otpVerify = true;
        await user.save();

        await sendWelcomeEmail(user.email, user.fullname);

        return res.status(200).json({
            message: "OTP verified successfully",
            success: true
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Some field is missing.",
                success: false,
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Invalid email or password.",
                success: false,
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(404).json({
                message: "Invalid email or password.",
                success: false,
            });
        }

        if (role !== user.role) {
            return res.status(403).json({
                message: "Account doesn't exist with current role.",
                success: false,
            });
        }

        const token = jwt.sign(
            {
                userId: user._id
            }, process.env.SECRET_KEY,
            {
                expiresIn: "1d",
            });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true,
            });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        return res.status(200).json({
            message: "Logged out successfully",
            success: true,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

export const profileUpdate = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found", success: false });
        }

        const updatedUser = await User.findById(userId);
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        // Handle file upload safely
        let cloudResponse = null;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const isPdf = req.file.mimetype === "application/pdf";
            const originalName = req.file.originalname;
            const fileNameWithoutExt = originalName.replace(/\.[^/.]+$/, "");
            cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
                resource_type: isPdf ? "raw" : "image",
                folder: isPdf ? "jobportal/resumes" : "jobportal/images",
                public_id: fileNameWithoutExt,
                format: isPdf ? "pdf" : undefined,
                use_filename: true,
                unique_filename: false
            });

            updatedUser.profile.resume = cloudResponse.secure_url;
            updatedUser.profile.resumeOriginalName = req.file.originalname;
        }

        // Text fields
        if (fullname) updatedUser.fullname = fullname;
        if (email) updatedUser.email = email;
        if (phoneNumber) updatedUser.phoneNumber = phoneNumber;
        if (bio) updatedUser.profile.bio = bio;

        if (skills) {
            const skillsArray = Array.isArray(skills)
                ? skills
                : skills.split(",").map((s) => s.trim());
            updatedUser.profile.skills = skillsArray;
        }

        await updatedUser.save();

        const responseUser = {
            _id: updatedUser._id,
            fullname: updatedUser.fullname,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            role: updatedUser.role,
            profile: updatedUser.profile,
        };

        return res.status(200).json({
            message: "Profile updated successfully.",
            success: true,
            user: responseUser,
        });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};