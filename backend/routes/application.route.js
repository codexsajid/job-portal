import express from "express";

import isAuthenticated from "../middleware/isAutentication.js";
import { applyJob, getApplicants, getAppliedJob, updatedStatus } from "../controllers/application.controller.js";

const route = express.Router()

route.post("/apply/:id", isAuthenticated, applyJob);
route.get("/get", isAuthenticated, getAppliedJob);
route.get("/:id/applicants", isAuthenticated, getApplicants);
route.post("/status/:id/update", isAuthenticated, updatedStatus);


export default route