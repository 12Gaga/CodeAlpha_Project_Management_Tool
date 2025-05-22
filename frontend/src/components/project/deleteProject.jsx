import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteProjectPage = ({
  deleteOpen,
  setDeleteOpen,
  projectname,
  projectId,
}) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/project/deleteProject",
        {
          params: { projectId },
          headers: { "Content-Type": "application/json" },
        }
      );

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
            Are you sure want to delete project {projectname} ? All the data
            (Tasks ) deal with project {projectname} will be deleted.
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

export default DeleteProjectPage;
