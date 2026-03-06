import { User } from "../models/user.model.js";
import Job from "../models/job.model.js";

export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const user = await User.findById(userId)
            .populate({
                path: "savedJobs",
                populate: {
                    path: "company",
                    select: "name logo",
                },
            });

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        return res.status(200).json({ success: true, jobs: user.savedJobs });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const addSavedJob = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { jobId } = req.params;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const alreadySaved = user.savedJobs.some((saved) => saved.toString() === jobId);
        if (alreadySaved) {
            return res.status(200).json({ message: "Job already saved", success: true, jobs: user.savedJobs });
        }

        user.savedJobs.push(jobId);
        await user.save();

        await user.populate({
            path: "savedJobs",
            populate: {
                path: "company",
                select: "name logo",
            },
        });

        return res.status(200).json({ success: true, jobs: user.savedJobs });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const removeSavedJob = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { jobId } = req.params;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        user.savedJobs = user.savedJobs.filter((saved) => saved.toString() !== jobId);
        await user.save();

        await user.populate({
            path: "savedJobs",
            populate: {
                path: "company",
                select: "name logo",
            },
        });

        return res.status(200).json({ success: true, jobs: user.savedJobs });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};
