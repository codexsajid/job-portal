import express from 'express';
import { login, logout, profileUpdate, register, verifySignupOtp } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAutentication.js';
import { singleUpload, multiUpload } from '../middleware/multer.js';
import { getSavedJobs, addSavedJob, removeSavedJob } from '../controllers/savedJob.controller.js';
import { resetPassword, sendOtp, verifyResetOtp } from '../controllers/otp.controller.js';


const route = express.Router();

route.post('/register', singleUpload, register);
route.post("/verify-otp", verifySignupOtp);
route.post('/login', login);
route.get('/logout', logout);
route.post('/profile/update', isAuthenticated, multiUpload, profileUpdate);

// Saved Jobs
route.get('/saved-jobs', isAuthenticated, getSavedJobs);
route.post('/saved-jobs/:jobId', isAuthenticated, addSavedJob);
route.delete('/saved-jobs/:jobId', isAuthenticated, removeSavedJob);

//OTP
route.post('/send-otp', sendOtp)
route.post("/verify-reset-otp", verifyResetOtp);
route.post("/reset-password", resetPassword);


export default route;