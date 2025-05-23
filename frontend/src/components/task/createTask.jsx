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
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const CreateTask = ({ open, setOpen, projectId, memberIds, fetchData }) => {
  const currentDate = dayjs();
  const [taskDetail, setTaskDetail] = useState({
    name: "",
    desc: "",
    deadline: dayjs(),
    priorities: "",
    status: "TO DO",
    memberId: 0,
    projectId,
  });

  const handleChange = (event) => {
    setTaskDetail({ ...taskDetail, memberId: event.target.value });
  };

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/task/createTask",
        { ...taskDetail, deadline: taskDetail.deadline.toISOString() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      setOpen(false);
      setTaskDetail({
        name: "",
        desc: "",
        deadline: dayjs(),
        priorities: "",
        status: "TO DO",
        memberId: 0,
        projectId,
      });
      fetchData();
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
          setTaskDetail({
            name: "",
            desc: "",
            deadline: dayjs(),
            priorities: "",
            status: "TO DO",
            memberId: 0,
            projectId,
          });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="secondary.main">
          Create Task
        </DialogTitle>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                "DatePicker",
                "MobileDatePicker",
                "DesktopDatePicker",
                "StaticDatePicker",
              ]}
            >
              <DemoItem label="Responsive variant">
                <DatePicker
                  value={taskDetail.deadline}
                  onChange={(newValue) => {
                    setTaskDetail({
                      ...taskDetail,
                      deadline: newValue,
                    });
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
              setTaskDetail({
                name: "",
                desc: "",
                deadline: dayjs(),
                priorities: "",
                status: "TO DO",
                memberId: 0,
                projectId,
              });
            }}
            sx={{
              fontSize: { xs: 11, md: 14 },
              borderColor: "secondary.main",
              color: "secondary.main",
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleClick}
            variant="contained"
            sx={{
              fontSize: { xs: 11, md: 14 },
              bgcolor: "secondary.main",
              color: "info.main",
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateTask;
