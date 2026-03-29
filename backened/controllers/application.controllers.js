import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
import mongoose from "mongoose"; //  Import for ObjectId validation

export const applyJob = async (req, res) => {
    try {
                console.log("req.params:", req.params);

        console.log("Request Body:", req.body);
        console.log("Authenticated User:", req.user);

        const userId = req.user?.id;
        const jobId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ success: false, message: "Invalid Job ID format" });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ success: false, message: "You have already applied for this job" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        const newApplication = await Application.create({ job: jobId, applicant: userId });

        job.applications = job.applications || [];
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(200).json({ success: true, message: "Application submitted successfully" });
    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: { path: "company" }
            });

     // ❌ Yeh 404 throw karta hai jo frontend mein error ban jaata hai
if (!applications || applications.length === 0) {
  return res.status(404).json({ success: false, message: "No applications found" });
}

// ✅ Isko replace karo
if (!applications) {
  return res.status(200).json({ success: true, applications: [] });
}

        return res.status(200).json({ success: true, applications });
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({ success: false, message: "Invalid Job ID format" });
        }

        const job = await Job.findById(jobId).populate({
            path: "applications",
            populate: { path: "applicant", select: "name email" }
        });

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        return res.status(200).json({ success: true, applicants: job.applications });
    } catch (error) {
        console.error(" Error fetching applicants:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        
        if (!status || !["pending", "accepted", "rejected"].includes(status.toLowerCase())) {
            return res.status(400).json({ success: false, message: "Invalid status" });
        }

        if (!mongoose.Types.ObjectId.isValid(applicationId)) {
            return res.status(400).json({ success: false, message: "Invalid Application ID format" });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({ success: false, message: "Application not found" });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({ success: true, message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating status:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
