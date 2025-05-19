import { Box, Paper, Typography } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useState } from "react";
import CreateGroupPage from "../../components/group/createGroup";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const GroupPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const finalGroup = (allgroups) => {
    allgroups.map((i) => {
      const exit = groups.find((g) => i.groupId === g.groupId);
      if (!exit) {
        setGroups([...groups, i]);
      }
    });
  };
  console.log("dsgg", groups);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5000/group/getGroups", {
          params: { userId: currentUser.id },
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response:", res.data);
        finalGroup(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  console.log("group", groups);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GroupAddIcon
          sx={{ fontSize: 40 }}
          onClick={() => {
            setOpen(true);
          }}
        />
      </Box>
      {groups.map((g) => (
        <Link key={g.id}>
          <Paper>
            <Typography>{g.groupName}</Typography>
          </Paper>
        </Link>
      ))}
      <CreateGroupPage open={open} setOpen={setOpen} />
    </>
  );
};
export default GroupPage;
