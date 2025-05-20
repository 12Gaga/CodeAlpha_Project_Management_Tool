import express from "express";
import { createGroup, getGroups, getGroup } from "../controllers/group.js";

const router = express.Router();

router.post("/createGroup", createGroup);
router.get("/getGroups", getGroups);
router.get("/getGroup", getGroup);

export default router;
