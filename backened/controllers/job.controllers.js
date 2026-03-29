import Job from "../models/job.model.js";
import mongoose from "mongoose";

export const postJob = async (req, res) => {
    try {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Request body is empty", success: false });
        }

        const jobsData = Array.isArray(req.body) ? req.body : [req.body]; 

        const jobsToCreate = jobsData.map(job => {
            const { title, requirements, jobType, experience, description, location, salary, companyId, position } = job;
            const userId = req.user?.id;

            if (!title || !description || !location || !jobType || !experience || !position || !userId || !companyId || !requirements || !salary) {
                throw new Error("All fields are required");
            }

            if (!mongoose.Types.ObjectId.isValid(companyId)) {
                throw new Error("Invalid companyId format");
            }

            return {
                title,
                description,
                location,
                jobType,
                experience: Number(experience) >= 0 ? Number(experience) : 0, 
                position,
                company: new mongoose.Types.ObjectId(companyId),
                requirements: Array.isArray(requirements) ? requirements : [], 
                salary: !isNaN(Number(salary)) ? Number(salary) : 0,
                created_by: userId
            };
        });

        const jobs = await Job.insertMany(jobsToCreate); 

        res.status(201).json({ message: "Job(s) posted successfully", jobs, success: true });

    } catch (error) {
        console.error("Error posting job:", error);
        res.status(400).json({ message: error.message || "Internal server error", success: false });
    }
};


export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
               
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company",
        }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({ message: "Job not found", success: false });      

        };
        res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// export const getJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({ message: "Job not found", success: false });
//         }
//         res.status(200).json({ job, success: true });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// }
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId)
            .populate("company")
            .populate({
                path: "applications",
                populate: {
                    path: "applicant",
                    model: "User",
                    select: "fullname email phoneNumber profile"
                }
            });

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        // ✅ applications transform karo — resume & profilePhoto map karo
        const transformedJob = job.toObject();
        transformedJob.applications = transformedJob.applications.map(app => ({
            ...app,
            applicant: {
                ...app.applicant,
                profile: {
                    ...app.applicant?.profile,
                    resumeUrl: app.applicant?.profile?.resume,       // ✅
                    avatarUrl: app.applicant?.profile?.profilePhoto,  // ✅
                }
            }
        }));

        res.status(200).json({ job: transformedJob, success: true });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.id;
        const job = await Job.find({created_by: adminId});

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }
        res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const updatedJob = req.body;
        const job = await Job.findByIdAndUpdate(jobId, updatedJob, { new: true });
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }
        res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}