import {
  register,
  login,
  sendOtp,
  verifyotp,
  resetPassword,
} from "../Controllers/authController.js";
import express from "express";

const router = express.Router();

// register route
router.post("/register", register);

// login route
router.post("/login", login);

// send OTP route
router.post("/send-otp", sendOtp);

// verify OTP route
router.post("/verify-otp", verifyotp);

// reset password route
router.post("/reset-password", resetPassword);

export default router; 
