import otpEmailTemplate from "../utile/otpEmailTemplate.js";
import welcomeEmailTemplate from "../utile/welcomeEmailTemplate.js";
import { transporter } from "../utile/sendMail.js";

// 1️⃣ Send OTP email
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


// 2️⃣ Send Welcome email (after OTP verification passes)
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
