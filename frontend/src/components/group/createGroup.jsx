import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button,
  Typography,
  TextField,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
const CreateGroupPage = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  console.log("name", name);
  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/group/createGroup",
        { name: name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      setOpen(false);
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
        <DialogTitle id="alert-dialog-title">{"Create Group"}</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-basic"
            label="Group Name"
            variant="outlined"
            sx={{ width: 300, mt: 3 }}
            onChange={(e) => {
              setName(e.target.value);
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
          <Button variant="contained" onClick={handleClick}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateGroupPage;
