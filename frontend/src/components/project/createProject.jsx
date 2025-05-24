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
import { Config } from "../../config";

const CreateProject = ({ open, setOpen, groupId, fetchData }) => {
  const [projectDetail, setProjectDetail] = useState({
    name: "",
    desc: "",
    groupId,
  });
  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${Config.apiBaseUrl}/project/createProject`,
        projectDetail,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      setOpen(false);
      setProjectDetail({
        name: "",
        desc: "",
        groupId,
      });
      fetchData();
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
          setProjectDetail({
            name: "",
            desc: "",
            groupId,
          });
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="secondary.main">
          Create Project
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Project Name"
            variant="outlined"
            sx={{ width: { xs: 210, sm: 300 }, mt: 3 }}
            onChange={(e) => {
              setProjectDetail({ ...projectDetail, name: e.target.value });
            }}
          />
          <TextField
            id="outlined-basic"
            label="Project Description"
            variant="outlined"
            sx={{ width: { xs: 210, sm: 300 }, mt: 3 }}
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
              setProjectDetail({
                name: "",
                desc: "",
                groupId,
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
export default CreateProject;
