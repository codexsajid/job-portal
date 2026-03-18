import { Company } from "../models/company.model.js";
import Job from "../models/job.model.js";
import cloudinary from "../utile/cloudinary.js";
import getDataUri from "../utile/datauri.js";


export const createCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }
        company = await Company.create({
            name: companyName,
            userId: req.user.userId
        });

        return res.status(201).json({
            message: "Company created successfully",
            success: true,
            data: company
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export const getAllCompanies = async (req, res) => {
    try {

        const userId = req.user.userId;

        const companies = await Company.find({ userId });

        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Companies fetched successfully",
            success: true,
            data: companies
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}

export const fetchCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Company fetched successfully",
            success: true,
            data: company
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export const updateCompanyById = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        const updateData = { name, description, website, location };

        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            updateData.logo = cloudResponse.secure_url;
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company information updated.",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};

export const deleteCompany = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        // Check if user owns the company
        if (company.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "Unauthorized",
                success: false
            });
        }
        // Check if there are jobs
        const jobs = await Job.find({ company: companyId });
        if (jobs.length > 0) {
            return res.status(400).json({
                message: "Cannot delete company with existing jobs",
                success: false
            });
        }
        await Company.findByIdAndDelete(companyId);
        return res.status(200).json({
            message: "Company deleted successfully",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};
