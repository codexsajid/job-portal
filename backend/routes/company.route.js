import express from 'express';
import { createCompany, fetchCompanyById, getAllCompanies, updateCompanyById } from '../controllers/company.controller.js';
import isAuthenticated from "../middleware/isAutentication.js"
import { singleUpload } from '../middleware/multer.js';
const route = express.Router();

route.post('/createCompany', isAuthenticated, createCompany);
route.get('/getAllCompanies', isAuthenticated, getAllCompanies);
route.get('/getCompanyById/:id', isAuthenticated, fetchCompanyById);
route.put('/updateCompany/:id', isAuthenticated, singleUpload, updateCompanyById);
export default route;