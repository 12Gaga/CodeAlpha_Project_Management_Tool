import express from "express";
import {
  createProject,
  getProjects,
  getProject,
  getUserProjects,
} from "../controllers/project.js";

const router = express.Router();

router.post("/createProject", createProject);
router.get("/getProjects", getProjects);
router.get("/getProject", getProject);
router.get("/getUserProjects", getUserProjects);

export default router;
