import express from "express";
import { getGoogleUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/google", getGoogleUser);

export default router;
