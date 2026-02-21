import express from "express";

import isAuthenticated from "../middleware/isAutentication.js";
import { applyJob, deleteApplication, getApplicants, getAppliedJob, updatedStatus } from "../controllers/application.controller.js";

const route = express.Router()

route.post("/apply/:id", isAuthenticated, applyJob);
route.get("/get", isAuthenticated, getAppliedJob);
route.get("/:id/applicants", isAuthenticated, getApplicants);
route.post("/status/:id/update", isAuthenticated, updatedStatus);
route.delete("/:id", isAuthenticated, deleteApplication);


export default route
