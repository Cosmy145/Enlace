import { Router } from "express";
import { verifyOtp, sendOtp } from "../controllers/otp.controller.js";
const router = Router();

router.route('/verify_otp').post(verifyOtp);
router.route('/send_otp').post(sendOtp);

export default router;
