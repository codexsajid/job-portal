import Job from "../models/job.model.js";

//admin will post
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, location, salary, experience, jobType, position, companyId } = req.body
        const recruiterId = req.user.userId;
        if (!title || !description || !requirements || !location || !salary || !experience || !jobType || !position || !companyId) {
            return res.status(400).json({
                message: 'Some field is missing.',
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            location,
            salary,
            jobType,
            position,
            experience,
            company: companyId,
            created_by: recruiterId
        })
        if (!job) {
            return res.status(400).json({
                message: 'Failed to create Job.',
                success: false
            })
        }
        return res.status(200).json({
            message: 'New Job Sucessfully Created.',
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
};

//admin can see all created job
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.user.userId
        const jobs = await Job.find({ created_by: adminId }).populate({ path: 'company' }).sort({ createdAt: -1 })
        if (!jobs) {
            return res.status(400).json({
                message: "Job not found",
                success: false,
            })
        }
        return res.status(200).json({
            jobs,
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

//user can see all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword } },
                { description: { $regex: keyword } }
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 }).populate({
            path: "applications"
        }).sort({ createdAt: -1 })
        if (!jobs) {
            return res.status(400).json({
                message: "Job not found",
                success: false,
            })
        }
        return res.status(201).json({
            message: "Successfully fetched",
            success: true,
            jobs
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Error",
            success: false,
            error: error.message
        })
    }
}

//user can search Job by ID 
export const getJobById = async (req, res) => {
    try {

        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "applications"
        })
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false,
            })
        }
        return res.status(200).json({
            job,
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



