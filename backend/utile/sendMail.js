import nodemailer from "nodemailer";

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});

// Send an email using async/await
const sendMail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: "sk7281293@gmail.com",
            to,
            subject,
            text,
            html
        });
        console.log("Message sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

export default sendMail;