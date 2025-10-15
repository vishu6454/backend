import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// register
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.json({ msg: "User registered successfully", user });
};
// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findone({ email });
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ msg: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
// send OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await User.findOneAndUpdate(
    { email },
    { otp, otpExpiry: Date.now() + 300000 }
  );
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
  });
  res.json({ message: "OTP sent to email!" });
};

// verify OTP

export const verifyotp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });
  if (!email) {
    return res.status(400).json({ message: "Email is Invalid" });
  }
};
