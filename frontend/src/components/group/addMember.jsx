import {
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Button,
  Typography,
  TextField,
  DialogActions,
  Chip,
  Box,
  MenuItem,
  Paper,
  MenuList,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import { Config } from "../../config";

const AddMemberPage = ({
  setAddMemberOpen,
  addMemberOpen,
  groupId,
  fetchData,
}) => {
  const [searchName, setSearchName] = useState("");
  const [returnUser, setReturnUser] = useState([]);
  const [exit, setExit] = useState(false);
  const [addMember, setAddMember] = useState([]);

  const handleClick = async () => {
    try {
      const res = await axios.post(
        `${Config.apiBaseUrl}/group/addMembers`,
        { addMembers: addMember.map((i) => i.id), groupId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", res.data);
      setAddMemberOpen(false);
      setReturnUser([]);
      setSearchName("");
      setExit(false);
      setAddMember([]);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const findUser = async () => {
    try {
      const res = await axios.get(`${Config.apiBaseUrl}/users/getUsers`, {
        params: { name: searchName },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      setReturnUser(res.data);
      setSearchName("");
      setExit(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Dialog
        open={addMemberOpen}
        onClose={() => {
          setAddMemberOpen(false);
          setExit(false);
          setSearchName("");
          setReturnUser([]);
          setAddMember([]);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ color: "secondary.main" }}>
          Add Members
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: { xs: "block", sm: "flex" },
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Search Member"
              variant="outlined"
              sx={{ width: { xs: 210, sm: 300 }, mt: 3 }}
              onChange={(e) => {
                setSearchName(e.target.value);
                setExit(false);
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={findUser}
              sx={{
                mt: 3,
                ml: { xs: 0, sm: 2 },
                bgcolor: "secondary.main",
                color: "info.main",
              }}
            >
              Search
            </Button>
          </Box>

          <Box sx={{ display: exit ? "block" : "none" }}>
            {exit &&
              (returnUser.length ? (
                <Paper
                  sx={{ width: { xs: 210, sm: 300 }, mt: { xs: 2, sm: 0 } }}
                >
                  <MenuList>
                    {returnUser.map((user) => (
                      <MenuItem
                        key={user.id}
                        onClick={() => {
                          setAddMember([...addMember, user]);
                        }}
                      >
                        <img
                          src={user.profilePic}
                          style={{
                            width: "27px",
                            height: "27px",
                            borderRadius: "100%",
                            marginRight: "8px",
                          }}
                        />
                        {user.username}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Paper>
              ) : (
                <Typography sx={{ mt: 2, color: "secondary.main" }}>
                  <PersonOffIcon /> User Not found !
                </Typography>
              ))}
          </Box>

          {addMember.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Paper
                sx={{
                  width: { xs: 210, sm: 300 },
                  padding: { xs: 2, sm: 3 },
                  bgcolor: "info.main",
                }}
              >
                Add Members
                {addMember.map((member) => (
                  <Chip
                    sx={{ ml: 1, mt: 1 }}
                    avatar={<Avatar alt="Natacha" src={member.profilePic} />}
                    label={member.username}
                    onDelete={() => {
                      const members = addMember.filter(
                        (m) => m.id !== member.id
                      );
                      setAddMember(members);
                    }}
                    key={member.id}
                  />
                ))}
              </Paper>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              fontSize: { xs: 11, md: 14 },
              borderColor: "secondary.main",
              color: "secondary.main",
            }}
            variant="outlined"
            onClick={() => {
              setAddMemberOpen(false);
              setExit(false);
              setSearchName("");
              setReturnUser([]);
              setAddMember([]);
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMemberPage;
