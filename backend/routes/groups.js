import express from "express";
import {
  createGroup,
  getGroups,
  getGroup,
  deleteGroup,
} from "../controllers/group.js";

const router = express.Router();

router.post("/createGroup", createGroup);
router.get("/getGroups", getGroups);
router.get("/getGroup", getGroup);
router.delete("/deleteGroup", deleteGroup);

export default router;
