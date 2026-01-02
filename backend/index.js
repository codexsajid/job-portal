import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config({});
import { connectDB } from './db/db.js';
import userRoutes from './routes/user.route.js';
import companyRoutes from './routes/company.route.js';
import jobRoutes from './routes/job.route.js';
import applicantRoutes from "./routes/application.route.js";


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: "https://job-portal-1-fapb.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));


// API routes
app.use('/api/user', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/job', jobRoutes);
app.use("/api/application", applicantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});