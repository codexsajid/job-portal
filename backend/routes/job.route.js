import express from "express"
import isAuthenticated from "../middleware/isAutentication.js"
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js"

const route = express()

route.post("/postJob",isAuthenticated,postJob);
route.get("/getAdminJob",isAuthenticated,getAdminJobs);
route.get("/getAllJobs",isAuthenticated,getAllJobs);
route.get("/getJobById/:id",isAuthenticated,getJobById);

export default route