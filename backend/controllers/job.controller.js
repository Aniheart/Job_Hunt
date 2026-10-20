
import { Job } from "../models/job.model.js";

// Admin posts a job
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId
        } = req.body;

        const userId = req.id;

        if (
            !title || !description || !requirements ||
            salary === undefined || salary === "" ||
            !location || !jobType ||
            experience === undefined || experience === "" ||
            position === undefined || position === "" ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const job = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements)
                ? requirements
                : requirements.split(",").map(item => item.trim()).filter(Boolean),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: Number(experience),
            position: Number(position),
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });

    } catch (error) {
        console.error("Post job error:", error);

        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get jobs for students
export const getAllJobs = async (req, res) => {
    try {
        const keyword = (req.query.keyword || "").trim();

        // Escape regex special characters in user input
        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const query = escapedKeyword
            ? {
                $or: [
                    { title: { $regex: escapedKeyword, $options: "i" } },
                    { description: { $regex: escapedKeyword, $options: "i" } }
                ]
            }
            : {};

        // Limit results to avoid fetching the entire collection
        const jobs = await Job.find(query)
            .select("-__v")
            .populate({
                path: "company",
                select: "name logo location"
            })
            .sort({ createdAt: -1 })
            .limit(50)
            .lean();

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error("Get all jobs error:", error);

        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get a job by ID
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate({
                path: "applications"
            })
            .lean();

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error("Get job by ID error:", error);

        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};

// Get jobs created by the logged-in admin
export const getAdminJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            created_by: req.id
        })
            .populate({
                path: "company",
                select: "name logo location"
            })
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error("Get admin jobs error:", error);

        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
