import express from "express";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../controllers/comment.js";
const router = express.Router();

router.post("/createComment", createComment);
router.get("/getComments", getComments);
router.put("/updateComment", updateComment);
router.delete("/deleteComment", deleteComment);

export default router;
