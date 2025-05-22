import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteTaskPage = ({ deleteOpen, setDeleteOpen, taskName, taskId }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await axios.delete("http://localhost:5000/task/deleteTask", {
        params: { taskId },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      navigate("/projects");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Dialog
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography variant="h6">
            Are you sure want to delete task {taskName} ? All the data deal with
            task {taskName} will be deleted.
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setDeleteOpen(false);
            }}
          >
            Close
          </Button>
          <Button variant="contained" onClick={handleClick}>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteTaskPage;
