import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import { Request, Response } from "express";
import OTPModel from "../models/otp.model.js";
import bcrypt from "bcrypt";
import cloudinary from "../utils/cloudinary.js";
import { UploadApiResponse } from "cloudinary";
import { generateToken } from "../utils/jwt.js";

interface LoginRequest {
  email: string;
  otp: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  profileImage?: string;
}

const login = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  if (!req.body) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Please provide a request body" });
  }
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Email and OTP are required" });
  }

  try {
    // 1. Verify User Exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User not found" });
    }

    // 2. Verify OTP
    const otpRecord = await OTPModel.findOne({ email });
    if (!otpRecord) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "OTP not found" });
    }
    if (otpRecord.expiresAt < new Date()) {
      await OTPModel.deleteOne({ email });
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "OTP expired" });
    }

    const isValid = await bcrypt.compare(otp, otpRecord.otp);
    if (!isValid) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid OTP" });
    }

    // Clear OTP after successful use
    await OTPModel.deleteOne({ email });

    // Fix for legacy users without name
    if (!existingUser.name) {
      existingUser.name = "User";
      await existingUser.save();
    }

    // 3. Generate JWT token
    const token = generateToken({
      userId: existingUser._id.toString(),
      email: existingUser.email,
      name: existingUser.name,
      profileImage: existingUser.profileImage || undefined,
    });

    // 4. Set JWT in HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(httpStatus.OK).json({
      message: "Login successful",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        profileImage: existingUser.profileImage,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response
) => {
  if (!req.body) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Please provide a request body" });
  }
  const { name, email } = req.body;

  // Note: profileImage might be passed in body if no file is uploaded,
  // or we overwrite it if a file IS uploaded.
  let profileImage = req.body.profileImage;

  if (!name || !email) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Name and email are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User already exists" });
    }

    // Upload Image to Cloudinary if profileImage is provided (Base64 or URL)
    if (profileImage) {
      if (profileImage.startsWith("data:image")) {
        const uploadResponse = await cloudinary.uploader.upload(profileImage, {
          folder: "user-profiles",
        });
        profileImage = uploadResponse.secure_url;
      }
      // If it's already a URL (e.g. from Google Auth), we just keep it
    }

    const newUser = new User({ name, email, profileImage });
    await newUser.save();

    // Generate JWT token
    const token = generateToken({
      userId: newUser._id.toString(),
      email: newUser.email,
      name: newUser.name,
      profileImage: newUser.profileImage || undefined,
    });

    // Set JWT in HttpOnly cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(httpStatus.CREATED).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const checkEmail = async (
  req: Request<{}, {}, { email: string }>,
  res: Response
) => {
  if (!req.body || !req.body.email) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "Please provide an email" });
  }

  const { email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "No account found with this email", exists: false });
    }

    return res
      .status(httpStatus.OK)
      .json({ message: "User found", exists: true });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    // User data is already attached by authenticateToken middleware
    if (!req.user) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ message: "Not authenticated" });
    }

    // Return user data from JWT
    return res.status(httpStatus.OK).json({
      user: {
        id: req.user.userId,
        email: req.user.email,
        name: req.user.name,
        profileImage: req.user.profileImage || undefined,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(httpStatus.OK).json({
      message: "Logout successful",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

export { register, checkEmail, login, logout, getCurrentUser };
