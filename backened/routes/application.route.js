import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/apply/:id", isAuthenticated, applyJob);    
router.get("/getApplicants/:id", isAuthenticated, getApplicants);
router.get("/get", isAuthenticated, getAppliedJobs);
router.put("/status/:id/update", isAuthenticated, updateStatus);

export default router;