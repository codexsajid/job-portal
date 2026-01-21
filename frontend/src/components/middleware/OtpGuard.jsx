import React from "react";
import { Navigate } from "react-router-dom";

const OtpGuard = ({ children }) => {
    // Check for both signup and password reset flows
    const emailForSignup = localStorage.getItem("emailForOtp");
    const emailForReset = localStorage.getItem("emailForReset");
    const email = emailForSignup || emailForReset;

    if (!email) {
        // User did NOT signup/forgot-password or refreshed
        return <Navigate to="/signup" replace />;
    }

    return children;
};

export default OtpGuard;
