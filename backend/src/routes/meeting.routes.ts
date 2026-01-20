import { Router } from "express";
import {
  checkEmail,
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../utils/authMiddleware.js";
import createMeeting from "../controllers/meeting.controller.js";

const router = Router();

router.route('/createMeeting').post(authenticateToken, createMeeting);

export default router;
