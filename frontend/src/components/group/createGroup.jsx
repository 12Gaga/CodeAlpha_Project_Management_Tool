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
const CreateGroupPage = ({ open, setOpen }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [name, setName] = useState("");
  const [searchName, setSearchName] = useState("");
  const [returnUser, setReturnUser] = useState([]);
  const [exit, setExit] = useState(false);
  const [addMember, setAddMember] = useState([currentUser]);

  console.log("emefg", addMember);
  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/group/createGroup",
        { groupName: name, members: addMember.map((i) => i.id) },
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

  const findUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/users/getUsers", {
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
        open={open}
        onClose={() => {
          setOpen(false);
          setExit(false);
          setSearchName("");
          setReturnUser([]);
          setAddMember([currentUser]);
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Search Member"
              variant="outlined"
              sx={{ width: 300, mt: 3 }}
              onChange={(e) => {
                setSearchName(e.target.value);
                setExit(false);
              }}
            />
            <Button
              variant="contained"
              size="small"
              onClick={findUser}
              sx={{ mt: 3, ml: 2 }}
            >
              Search
            </Button>
          </Box>

          <Box sx={{ display: exit ? "block" : "none" }}>
            {exit &&
              (returnUser.length ? (
                <Paper sx={{ width: 300 }}>
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
                <Typography sx={{ mt: 1.5 }}>User Not found</Typography>
              ))}
          </Box>

          {addMember.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Paper sx={{ width: 300, padding: 3 }}>
                Group Members
                {addMember.map((member) => (
                  <Chip
                    sx={{ ml: 1 }}
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
            variant="outlined"
            onClick={() => {
              setOpen(false);
              setExit(false);
              setSearchName("");
              setReturnUser([]);
              setAddMember([currentUser]);
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
