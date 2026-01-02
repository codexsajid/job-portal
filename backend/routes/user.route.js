import express from 'express';
import { login, logout, profileUpdate, register } from '../controllers/user.controller.js';
import isAuthenticated from '../middleware/isAutentication.js';
import { singleUpload } from '../middleware/multer.js';

const route = express.Router();

route.post('/register', singleUpload, register);
route.post('/login', login);
route.get('/logout', logout);
route.post('/profile/update', isAuthenticated, singleUpload, profileUpdate);

export default route;