import express from "express";
import { createGroup } from "../controllers/group.js";

const router = express.Router();

router.post("/createGroup", createGroup);

export default router;
