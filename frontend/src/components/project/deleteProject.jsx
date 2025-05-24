import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Config } from "../../config";

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
        `${Config.apiBaseUrl}/project/deleteProject`,
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
          <Typography
            sx={{ fontSize: { xs: 15, md: 18 }, color: "secondary.main" }}
          >
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
            sx={{
              fontSize: { xs: 11, md: 14 },
              borderColor: "secondary.main",
              color: "secondary.main",
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{
              fontSize: { xs: 11, md: 14 },
              bgcolor: "secondary.main",
              color: "info.main",
            }}
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProjectPage;
