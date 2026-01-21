import express from 'express';
import { login, logout, profileUpdate, register, verifySignupOtp } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAutentication.js';
import { singleUpload } from '../middleware/multer.js';
import { resetPassword, sendOtp } from '../controllers/otp.controller.js';


const route = express.Router();

route.post('/register', singleUpload, register);
route.post("/verify-otp", verifySignupOtp);
route.post('/login', login);
route.get('/logout', logout);
route.post('/profile/update', isAuthenticated, singleUpload, profileUpdate);

//OTP
route.post('/send-otp', sendOtp)
route.post("/reset-password", resetPassword);


export default route;