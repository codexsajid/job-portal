import { Application } from "../models/application.model.js";
import Job from "../models/job.model.js";
export const applyJob = async (req, res) => {
    try {

        if (!req.user || !req.user.userId) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const userId = req.user.userId;
        const jobId = req.params.id
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }
        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save()
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};



export const getAppliedJob = async (req, res) => {
    try {
        const userId = req.user.userId;

        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } }
                }
            })
            .populate({
                path: 'applicant',
                select: 'name email'
            });

        if (!application || application.length === 0) {
            return res.status(400).json({
                message: "No Applications",
                success: false
            });
        }

        return res.status(200).json({
            application,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Error",
            success: false,
            error: error.message
        });
    }
};

//admin can see how many user applied job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        })
        if (!job) {
            return res.status(400).json({
                message: "Job Not Found.",
                success: false,
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Error",
            success: false,
            error: error.message
        })
    }
}

export const updatedStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "status is required.",
                success: false,
            })
        }
        const application = await Application.findById({ _id: applicationId })
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false,
            })
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal Error",
            success: false,
            error: error.message
        })
    }
}

export const deleteApplication = async (req, res) => {
    try {
        const userId = req.user.userId;
        const applicationId = req.params.id;

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        // Check if the user is the owner of the application
        if (application.applicant.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this application",
                success: false
            });
        }

        await Job.updateOne(
            { _id: application.job },
            { $pull: { applications: applicationId } }
        );

        await Application.findByIdAndDelete(applicationId);

        return res.status(200).json({
            message: "Application deleted successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Error",
            success: false,
            error: error.message
        });
    }
}
