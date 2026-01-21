import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { sendPasswordResetEmail, sendOtpEmail, sendForgotPasswordOtpEmail } from "../middleware/emailCode.js";

// Generate 4-digit OTP
export const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false
            });
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const otp = generateOtp()
        user.otp = otp
        user.otpExpiry = Date.now() + 5 * 60 * 1000
        await user.save()

        // Send Forgot Password OTP email
        await sendForgotPasswordOtpEmail(user.email, user.fullname, otp);

        return res.status(200).json({
            message: "OTP sent successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}

export const verifyResetOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email & OTP required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // OTP required
        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ message: "OTP not generated", success: false });
        }

        // Wrong OTP
        if (user.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP", success: false });
        }

        // Expired
        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP expired", success: false });
        }

        // OTP Valid → clear otp
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        return res.status(200).json({ message: "OTP verified successfully", success: true });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email & new password required", success: false });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        // Check if OTP already verified (both must be null)
        if (user.otp !== null || user.otpExpiry !== null) {
            return res.status(403).json({ message: "OTP verification required", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        // Send password reset confirmation email
        await sendPasswordResetEmail(email, user.fullname);

        return res.status(200).json({
            message: "Password reset successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};
