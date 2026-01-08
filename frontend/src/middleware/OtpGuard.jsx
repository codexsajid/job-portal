import React from "react";
import { Navigate } from "react-router-dom";

const OtpGuard = ({ children }) => {
    const email = localStorage.getItem("emailForOtp");

    if (!email) {
        // User did NOT signup or refreshed
        return <Navigate to="/signup" replace />;
    }

    return children;
};

export default OtpGuard;
