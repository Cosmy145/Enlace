import express from "express";
import { reverseGeocode } from "../controllers/geocode.controller";

const router = express.Router();

router.get("/reverse", reverseGeocode);

export default router;
