

import express from "express";
import { postJob, getAllJobs, getAdminJobs, getJobById, updateJob } from "../controllers/job.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Create job
router.post("/post", isAuthenticated, postJob);

// Get all jobs
router.get("/get", isAuthenticated, getAllJobs);

// Get single job by ID ✅
router.get("/get/:id", isAuthenticated, getJobById);

// Get admin jobs
router.get("/getAdminJob", isAuthenticated, getAdminJobs);

router.put("/update/:id", isAuthenticated, updateJob);


export default router;