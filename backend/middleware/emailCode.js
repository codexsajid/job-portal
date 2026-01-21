import otpEmailTemplate from "../utile/otpEmailTemplate.js";
import welcomeEmailTemplate from "../utile/welcomeEmailTemplate.js";
import passwordResetEmailTemplate from "../utile/passwordResetEmailTemplate.js";
import forgotPasswordOtpTemplate from "../utile/forgotPasswordOtpTemplate.js";
import { transporter } from "../utile/sendMail.js";

// 1 Send OTP email
export const sendOtpEmail = async (to, fullname, otp) => {
    try {
        const response = await transporter.sendMail({
            from: `"Job Portal" <${process.env.GMAIL_USERNAME}>`,
            to,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`,
            html: otpEmailTemplate(fullname, otp),
        });

        console.log("OTP Email sent:", response.messageId);
    } catch (error) {
        console.error("❌ Error sending OTP email:", error);
    }
};


// 2 Send Welcome email (after OTP verification passes)
export const sendWelcomeEmail = async (to, fullname) => {
    try {
        const response = await transporter.sendMail({
            from: `"Job Portal" <${process.env.GMAIL_USERNAME}>`,
            to,
            subject: "Welcome to Job Portal 🎉",
            text: `Welcome ${fullname}! Your account setup is complete.`,
            html: welcomeEmailTemplate(fullname),
        });

        console.log("Welcome Email sent:", response.messageId);
    } catch (error) {
        console.error("❌ Error sending Welcome email:", error);
    }
};

// 3️ Send Password Reset email (after password is successfully changed)
export const sendPasswordResetEmail = async (to, fullname) => {
    try {
        const response = await transporter.sendMail({
            from: `"Job Portal" <${process.env.GMAIL_USERNAME}>`,
            to,
            subject: "Password Reset Successful ✅",
            text: `Hello ${fullname}, Your password has been successfully changed.`,
            html: passwordResetEmailTemplate(fullname),
        });

        console.log("Password Reset Email sent:", response.messageId);
    } catch (error) {
        console.error("❌ Error sending Password Reset email:", error);
    }
};
// 4️⃣ Send Forgot Password OTP email
export const sendForgotPasswordOtpEmail = async (to, fullname, otp) => {
    try {
        const response = await transporter.sendMail({
            from: `"Job Portal" <${process.env.GMAIL_USERNAME}>`,
            to,
            subject: "Password Reset OTP 🔐",
            text: `Hello ${fullname}, Your OTP for password reset is ${otp}. Valid for 5 minutes.`,
            html: forgotPasswordOtpTemplate(fullname, otp),
        });

        console.log("Forgot Password OTP Email sent:", response.messageId);
    } catch (error) {
        console.error("❌ Error sending Forgot Password OTP email:", error);
    }
};