import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  getUserTasks,
} from "../controllers/task.js";

const router = express.Router();

router.post("/createTask", createTask);
router.get("/getTasks", getTasks);
router.get("/getTask", getTask);
router.get("/getUserTasks", getUserTasks);

export default router;
