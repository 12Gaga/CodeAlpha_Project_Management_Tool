import express from "express";
import {
  createProject,
  getProjects,
  getProject,
} from "../controllers/project.js";

const router = express.Router();

router.post("/createProject", createProject);
router.get("/getProjects", getProjects);
router.get("/getProject", getProject);

export default router;
