import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Card,
  CardContent,
  TextField,
  Button,
} from "@mui/material";

const TaskDetailPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [comments, setComments] = useState([]);
  const [click, setClick] = useState(false);
  const [newComment, setNewComment] = useState({
    desc: "",
    taskId: id,
    userId: currentUser.id,
  });

  const handleAddComment = async () => {
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
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5000/task/getTask", {
          params: { taskId: id },
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response:", res.data);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
      try {
        const res = await axios.get(
          "http://localhost:5000/comment/getComments",
          {
            params: { taskId: id },
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Response:", res.data);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Link to={`/projects`} style={{ textDecoration: "none" }}>
          <Typography sx={{ mr: 2 }}>Projects</Typography>
        </Link>
        <Link to={`/tasks`} style={{ textDecoration: "none" }}>
          <Typography>My Tasks</Typography>
        </Link>
      </Box>
      {tasks.length > 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Task Name - {tasks[0].name}</Typography>
            <Typography>
              Created Time - {moment(tasks[0].createdAt).fromNow()}
            </Typography>
            {moment(tasks[0].deadline).diff(moment(), "days") >= 0 ? (
              <Typography>
                Deadline : {moment(tasks[0].deadline).diff(moment(), "days")}{" "}
                day(s) left
              </Typography>
            ) : (
              <Typography style={{ color: "red" }}>
                Deadline passed :
                {Math.abs(moment(tasks[0].deadline).diff(moment(), "days"))}{" "}
                day(s) ago
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Assignee : </Typography>
            <MenuItem sx={{ p: 0, py: 1, ml: 1 }}>
              <img
                src={tasks[0].assigneeUserPic}
                style={{
                  width: "27px",
                  height: "27px",
                  borderRadius: "100%",
                  marginRight: "8px",
                }}
              />
              {tasks[0].assigneeUserName}
            </MenuItem>
          </Box>
          <Typography>Description - {tasks[0].desc}</Typography>
          <Typography>Priorities - {tasks[0].priorities}</Typography>
          <Button
            sx={{ mt: 2 }}
            fullWidth
            variant="outlined"
            onClick={() => {
              setClick(!click);
            }}
          >
            Comment
          </Button>
          {/* Comments */}
          <Box
            sx={{
              display: click ? "block" : "none",
              height: 500,
              overflow: "scroll",
            }}
          >
            <Card fullWidth sx={{ margin: "auto", p: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 5,
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
                    value={newComment.desc}
                    sx={{ width: 1020, mx: 3 }}
                    label="Your comment"
                    variant="outlined"
                    onChange={(e) =>
                      setNewComment({ ...newComment, desc: e.target.value })
                    }
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
                      <Card key={c.id} sx={{ my: 1, p: 1 }}>
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
                          <Typography variant="body2">
                            {moment(c.createdAt).fromNow()}
                          </Typography>
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
      )}
    </>
  );
};
export default TaskDetailPage;
