import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  getUserTasks,
  updateStatus,
  deleteTask,
} from "../controllers/task.js";

const router = express.Router();

router.post("/createTask", createTask);
router.get("/getTasks", getTasks);
router.get("/getTask", getTask);
router.get("/getUserTasks", getUserTasks);
router.put("/updateStatus", updateStatus);
router.delete("/deleteTask", deleteTask);

export default router;
