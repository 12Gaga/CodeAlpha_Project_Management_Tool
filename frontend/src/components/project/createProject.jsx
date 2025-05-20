import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

const CreateProject = ({ open, setOpen, groupId }) => {
  const [projectDetail, setProjectDetail] = useState({
    name: "",
    desc: "",
    groupId,
  });
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
        <DialogTitle id="alert-dialog-title">Create Project</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Project Name"
            variant="outlined"
            sx={{ width: 300, mt: 3 }}
            onChange={(e) => {
              setProjectDetail({ ...projectDetail, name: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Project Description"
            variant="outlined"
            sx={{ width: 300, mt: 3 }}
            onChange={(e) => {
              setProjectDetail({ ...projectDetail, desc: e.target.value });
            }}
          />
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
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateProject;
