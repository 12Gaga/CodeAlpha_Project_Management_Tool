import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const CreateTask = ({ open, setOpen, projectId, memberIds }) => {
  const [taskDetail, setTaskDetail] = useState({
    name: "",
    desc: "",
    deadline: "",
    priorities: "",
    status: "TO DO",
    memberId: "",
    projectId,
  });

  const handleChange = (event) => {
    setTaskDetail({ ...taskDetail, memberId: event.target.value });
  };

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/project/createProject",
        projectDetail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      window.location.reload();
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  console.log("memberId", taskDetail);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Create Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Task Name"
            variant="outlined"
            sx={{ mt: 3 }}
            onChange={(e) => {
              setTaskDetail({ ...taskDetail, name: e.target.value });
            }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Task Description"
            variant="outlined"
            sx={{ mt: 3 }}
            onChange={(e) => {
              setTaskDetail({ ...taskDetail, desc: e.target.value });
            }}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Task Priorities"
            variant="outlined"
            sx={{ mt: 3 }}
            onChange={(e) => {
              setTaskDetail({ ...taskDetail, priorities: e.target.value });
            }}
          />
          <FormControl fullWidth sx={{ mt: 3 }}>
            <InputLabel id="demo-simple-select-label">Members</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskDetail.memberId}
              label="Members"
              onChange={handleChange}
            >
              {memberIds.map((m) => (
                <MenuItem value={m.userId}>
                  <img
                    src={m.profilePic}
                    style={{
                      width: "27px",
                      height: "27px",
                      borderRadius: "100%",
                      marginRight: "8px",
                    }}
                  />
                  {m.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
            }}
          >
            Close
          </Button>
          <Button onClick={handleClick} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateTask;
