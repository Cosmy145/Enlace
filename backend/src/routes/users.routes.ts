import { Router } from "express";
import {
  checkEmail,
  register,
  login,
  logout,
  getCurrentUser,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../utils/authMiddleware.js";

const router = Router();

router.route("/check-email").post(checkEmail);
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.route("/me").get(authenticateToken, getCurrentUser);
router.route("/add_to_activity");
router.route("/get_all_activity");

export default router;
