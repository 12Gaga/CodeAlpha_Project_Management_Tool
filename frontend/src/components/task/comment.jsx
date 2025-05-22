import axios from "axios";
import moment from "moment";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const CommentPage = ({
  comments,
  setComments,
  newComment,
  setNewComment,
  click,
  taskId,
}) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [openMenuId, setOpenMenuId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [updateDesc, setUpdateDesc] = useState("");

  const toggleMenu = (id) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  const handleAddComment = async () => {
    if (comments.map((c) => c.id).includes(updateId)) {
      try {
        const res = await axios.put(
          "http://localhost:5000/comment/updateComment",
          { desc: updateDesc, userId: currentUser.id, taskId, id: updateId },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", res.data);
        const result = comments.map((c) =>
          c.id === res.data.id ? res.data : c
        );
        setComments(result);
        setOpenMenuId(null);
        setUpdateId(null);
        setUpdateDesc("");
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const res = await axios.post(
          "http://localhost:5000/comment/createComment",
          newComment,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", res.data);
        setComments([...comments, res.data]);
        setNewComment({ ...newComment, desc: "" });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleCommentUpdate = (commentId, commentDesc) => {
    setUpdateId(commentId);
    setUpdateDesc(commentDesc);
  };

  const handleCommentDelete = async (commentId) => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/comment/deleteComment",
        {
          data: {
            userId: currentUser.id,
            taskId,
            id: commentId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", res.data);
      const result = comments.filter((c) => c.id !== res.data);
      setComments(result);
    } catch (err) {
      console.error(err);
    }
  };

  console.log("comments", comments);
  return (
    <>
      <Box
        sx={{
          display: click ? "block" : "none",
          height: 500,
          overflow: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          position: "relative",
        }}
      >
        <Card fullWidth sx={{ margin: "auto", p: 2 }}>
          <CardContent>
            <Box
              sx={{
                bgcolor: "white",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                position: "fixed",
                bottom: 3,
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={currentUser.profilePic}
                  style={{
                    width: "27px",
                    height: "27px",
                    borderRadius: "100%",
                    marginRight: "8px",
                  }}
                />
                <Typography>{currentUser.username}</Typography>
              </Box>
              <TextField
                value={
                  comments.map((c) => c.id).includes(updateId)
                    ? updateDesc.trim()
                    : newComment.desc
                }
                sx={{ width: "65%", mx: 3 }}
                label="Your comment"
                variant="outlined"
                onChange={(e) => {
                  if (comments.map((c) => c.id).includes(updateId)) {
                    setUpdateDesc(e.target.value);
                  } else {
                    setNewComment({ ...newComment, desc: e.target.value });
                  }
                }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleAddComment}
              >
                Send
              </Button>
            </Box>

            {comments.length > 0 && (
              <Box sx={{}}>
                {comments.map((c) => (
                  <Card
                    key={c.id}
                    sx={{ my: 1, py: 3.5, px: 1.5, position: "relative" }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={c.profilePic}
                          style={{
                            width: "27px",
                            height: "27px",
                            borderRadius: "100%",
                            marginRight: "8px",
                          }}
                        />
                        <Typography>{c.username}</Typography>
                      </Box>
                      <Box sx={{ display: "flex" }}>
                        <Typography variant="body2">
                          {moment(c.createdAt).fromNow()}
                        </Typography>
                        <MoreVertIcon
                          sx={{ fontSize: 20 }}
                          onClick={() => {
                            toggleMenu(c.id);
                          }}
                        />
                        {openMenuId === c.id && (
                          <Card
                            key={c.id}
                            id={c.id}
                            sx={{
                              position: "absolute",
                              top: 45,
                              mt: 1,
                              right: 1,
                            }}
                          >
                            <MenuItem
                              onClick={() => {
                                handleCommentUpdate(c.id, c.desc);
                              }}
                            >
                              <EditIcon sx={{ fontSize: 19, mr: 1 }} />
                              Edit
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                handleCommentDelete(c.id);
                              }}
                            >
                              <DeleteIcon sx={{ fontSize: 19, mr: 1 }} />
                              Delete
                            </MenuItem>
                          </Card>
                        )}
                      </Box>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 3, ml: 4 }}>
                      {c.desc}
                    </Typography>
                  </Card>
                ))}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default CommentPage;
