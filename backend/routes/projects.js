import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  getUserProjects,
  deleteProject,
} from "../controllers/project.js";

const router = express.Router();

router.post("/createProject", createProject);
router.get("/getProjects", getProjects);
router.get("/getProject", getProject);
router.get("/getUserProjects", getUserProjects);
router.delete("/deleteProject", deleteProject);

export default router;
