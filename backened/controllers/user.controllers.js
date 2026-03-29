import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword, // Save hashed password
      role,
    });

    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password!", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password!", success: false });
    }

    if (user.role !== role) {
      return res
        .status(400)
        .json({ message: "Account does not exist!", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: {
        bio: user.profile?.bio,
        skills: user.profile?.skills,
        resumeUrl: user.profile?.resume, // ✅ DB field: resume
        avatarUrl: user.profile?.profilePhoto, // ✅ DB field: profilePhoto
      },
    };

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "strict",
      })
      .json({
        success: true,
        user,
        message: `Welcome back ${user.fullname}`,
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, skills, bio } = req.body;

    const skillsArray = skills ? skills.split(",").map((s) => s.trim()) : [];
    const userId = req.user.id;

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    user.fullname = fullname || user.fullname;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.email = email || user.email;
    user.profile.bio = bio || user.profile.bio;
    user.profile.skills =
      skillsArray.length > 0 ? skillsArray : user.profile.skills;

    // ✅ Resume upload
    const resumeFile = req.files?.file?.[0];
    if (resumeFile) {
      const fileUri = `data:${resumeFile.mimetype};base64,${resumeFile.buffer.toString("base64")}`;
      const cloudinaryRes = await cloudinary.uploader.upload(fileUri, {
        folder: "resumes",
        resource_type: "auto", // ✅ PDF automatically detect karega
        format: "pdf",
      });
      user.profile.resume = cloudinaryRes.secure_url;
    }

    // ✅ Photo upload
    const photoFile = req.files?.photo?.[0];
    if (photoFile) {
      const photoUri = `data:${photoFile.mimetype};base64,${photoFile.buffer.toString("base64")}`;
      const cloudinaryRes = await cloudinary.uploader.upload(photoUri, {
        folder: "avatars",
        resource_type: "image",
      });
      user.profile.profilePhoto = cloudinaryRes.secure_url;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: {
        bio: user.profile.bio,
        skills: user.profile.skills,
        resumeUrl: user.profile.resume,
        avatarUrl: user.profile.profilePhoto,
      },
    };

    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
