import { Link, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  Chip,
} from "@mui/material";
import CommentPage from "./comment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteTaskPage from "./deleteTask";

const TaskDetailPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { id } = useParams();
  const [tasks, setTasks] = useState({});
  const [comments, setComments] = useState([]);
  const [click, setClick] = useState(false);
  const [newstatus, setNewStatus] = useState("TO DO");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [newComment, setNewComment] = useState({
    desc: "",
    taskId: id,
    userId: currentUser.id,
  });

  const status = ["TO DO", "PROGRESS", "DONE"];
  const getColor = (status) => {
    if (status) {
      switch (status.trim()) {
        case "DONE":
          return "success";
        case "PROGRESS":
          return "primary";
        default:
          return "default";
      }
    } else {
      return "default";
    }
  };

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:5000/task/getTask", {
        params: { taskId: id },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      setTasks(res.data);
      setNewStatus(res.data.status.trim());
    } catch (err) {
      console.error(err);
    }
    try {
      const res = await axios.get("http://localhost:5000/comment/getComments", {
        params: { taskId: id },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleClick = async (status) => {
    try {
      const res = await axios.put(
        "http://localhost:5000/task/updateStatus",
        { status: status, taskId: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Link to={`/projects`} style={{}}>
            <Typography sx={{ mr: 2, color: "secondary.main", mb: 1 }}>
              Projects
            </Typography>
          </Link>
          <Link to={`/tasks`} style={{}}>
            <Typography sx={{ color: "secondary.main", mb: 1 }}>
              My Tasks
            </Typography>
          </Link>
        </Box>
        <Box>
          <DeleteOutlineIcon
            sx={{ fontSize: 25, color: "red" }}
            onClick={() => {
              setDeleteOpen(true);
            }}
          />
        </Box>
      </Box>
      {tasks && (
        <>
          <Box
            sx={{
              display: { xs: "block", sm: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: { xs: 18, sm: 20, lg: 25 } }}>
              Task Name - {tasks.name}
            </Typography>
            <Box>
              <Typography
                sx={{
                  my: { xs: 1, sm: 0 },
                  fontSize: { xs: 14, lg: 17 },
                }}
              >
                Created Time - {moment(tasks.createdAt).fromNow()}
              </Typography>
              {moment(tasks.deadline).diff(moment(), "days") >= 0 ? (
                <Typography sx={{ fontSize: { xs: 14, lg: 17 } }}>
                  Deadline : {moment(tasks.deadline).diff(moment(), "days")}{" "}
                  day(s) left
                </Typography>
              ) : (
                <Typography sx={{ color: "red", fontSize: { xs: 14, lg: 17 } }}>
                  Deadline passed :
                  {Math.abs(moment(tasks.deadline).diff(moment(), "days"))}{" "}
                  day(s) ago
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "block", sm: "flex" },
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: { xs: 14, lg: 17 } }}>
                Assignee :{" "}
              </Typography>
              <MenuItem sx={{ p: 0, py: 1, ml: 1 }}>
                <img
                  src={tasks.assigneeUserPic}
                  style={{
                    width: "27px",
                    height: "27px",
                    borderRadius: "100%",
                    marginRight: "8px",
                  }}
                />
                {tasks.assigneeUserName}
              </MenuItem>
            </Box>

            {currentUser.id == tasks.userId && (
              <Box>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                  <InputLabel
                    id="demo-select-small-label"
                    sx={{ fontSize: { xs: 14, lg: 17 } }}
                  >
                    Status
                  </InputLabel>
                  <Select
                    sx={{ fontSize: { xs: 12, lg: 14 } }}
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={newstatus}
                    label="Status"
                    onChange={(e) => {
                      setNewStatus(e.target.value);
                      handleClick(e.target.value);
                    }}
                  >
                    {status.map((s) => (
                      <MenuItem value={s} sx={{ fontSize: { xs: 12, lg: 14 } }}>
                        {s}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </Box>

          <Typography sx={{ fontSize: { xs: 14, lg: 17 }, my: 1 }}>
            Description - {tasks.desc}
          </Typography>
          <Typography sx={{ fontSize: { xs: 14, lg: 17 }, mb: 1 }}>
            Priorities - {tasks.priorities}
          </Typography>
          <Typography sx={{ fontSize: { xs: 14, lg: 17 } }}>
            Status :{" "}
            <Chip
              sx={{ fontSize: { xs: 10, md: 12 } }}
              label={tasks.status}
              color={tasks && getColor(tasks.status)}
            />
          </Typography>

          {/* Comments */}
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

          <CommentPage
            comments={comments}
            setComments={setComments}
            newComment={newComment}
            setNewComment={setNewComment}
            click={click}
            taskId={id}
          />
          <DeleteTaskPage
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            taskName={tasks.name}
            taskId={id}
          />
        </>
      )}
    </>
  );
};
export default TaskDetailPage;
