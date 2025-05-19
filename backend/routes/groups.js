import express from "express";
import { createGroup, getGroups } from "../controllers/group.js";

const router = express.Router();

router.post("/createGroup", createGroup);
router.get("/getGroups", getGroups);

export default router;
