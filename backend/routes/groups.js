import express from "express";
import {
  createGroup,
  getGroups,
  getGroup,
  deleteGroup,
  addMembers,
  removeMember,
} from "../controllers/group.js";

const router = express.Router();

router.post("/createGroup", createGroup);
router.post("/addMembers", addMembers);
router.get("/getGroups", getGroups);
router.get("/getGroup", getGroup);
router.delete("/deleteGroup", deleteGroup);
router.delete("/removeMember", removeMember);

export default router;
