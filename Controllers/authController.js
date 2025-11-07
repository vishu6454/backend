import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.json({ msg: "User registered", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ msg: "Login success", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await User.findOneAndUpdate({ email }, { otp, otpExpires: Date.now() + 300000 });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text:`Your OTP is ${otp}`
  });

  res.json({ msg: "OTP sent" });
};

// Verify OTP
export const verifyotp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ msg: "Invalid or expired OTP" });

  res.json({ msg: "OTP verified" });
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const hashed = await bcrypt.hash(newPassword, 10);
  await User.findOneAndUpdate({ email }, { password: hashed, otp: null, otpExpires: null });
  res.json({ msg: "Password reset successful" });
};