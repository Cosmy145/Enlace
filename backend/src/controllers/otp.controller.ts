import bcrypt from "bcrypt";
import { Request, Response } from "express";
import OTPModel from "../models/otp.model.js";
import { sendOTPEmail } from "../utils/sendOTPEmail.js";

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hash = await bcrypt.hash(otp, 10);
  await OTPModel.deleteMany({ email });
  await OTPModel.create({
    email,
    otp: hash,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });
  await sendOTPEmail(email, otp);
  res.status(200).json({ message: "OTP sent successfully" });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp, isLogin } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  const otpRecord = await OTPModel.findOne({ email });
  if (!otpRecord) {
    return res.status(400).json({ message: "OTP not found" });
  }
  if (otpRecord.expiresAt < new Date()) {
    await OTPModel.deleteOne({ email });
    return res.status(400).json({ message: "OTP expired" });
  }

  const isValid = await bcrypt.compare(otp, otpRecord.otp);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (!isLogin) {
    await OTPModel.deleteOne({ email });
  }

  res.status(200).json({ message: "OTP verified successfully" });
};
