import { Company } from "../models/company.model.js";
// import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.user.id
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.user.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}




export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found.", success: false });
    }

    company.name = name || company.name;
    company.description = description || company.description;
    company.website = website || company.website;
    company.location = location || company.location;

    // Upload logo if provided
    if (req.file) {
 const fileUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
const result = await cloudinary.uploader.upload(fileUri, {
  folder: "company_logos",
});
  company.logo = result.secure_url;
}

    await company.save();

    return res.status(200).json({
      message: "Company information updated successfully.",
      success: true,
      company,
    });
  } catch (error) {
    console.log("Update Company Error:", error);
    return res.status(500).json({
      message: error.message || "Something went wrong while updating company.",
      success: false,
    });
  }
};
