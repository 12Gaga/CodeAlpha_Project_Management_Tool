import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteGroupPage = ({ deleteOpen, setDeleteOpen, groupName, groupId }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const res = await axios.delete(
        "http://localhost:5000/group/deleteGroup",
        {
          params: { groupId },
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", res.data);
      navigate("/groups");
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
            Are you sure want to delete group {groupName} ? All the data
            (Projects , Tasks ) deal with group {groupName} will be deleted.
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

export default DeleteGroupPage;
