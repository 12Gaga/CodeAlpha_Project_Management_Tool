import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
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
    const temp = [...groups];
    allgroups.map((i) => {
      const exit = temp.find((g) => i.groupId === g.groupId);
      if (!exit) {
        temp.push(i);
      }
    });
    setGroups(temp);
  };
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
  useEffect(() => {
    fetchData();
  }, []);
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
      <Typography variant="h5" sx={{ my: 4, textDecoration: "underline" }}>
        Groups
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {groups
          .sort((a, b) => a.groupId - b.groupId)
          .map((g) => (
            <Link
              to={`/group/${g.groupId}`}
              key={g.id}
              style={{ textDecoration: "none" }}
            >
              <Card sx={{ width: 150, mr: 3 }}>
                <CardActionArea
                  sx={{
                    height: "100%",
                    "&[data-active]": {
                      backgroundColor: "action.selected",
                      "&:hover": {
                        backgroundColor: "action.selectedHover",
                      },
                    },
                  }}
                >
                  <CardContent sx={{ height: "100%" }}>
                    <Typography variant="h5" component="div">
                      {g.groupName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))}
      </Box>
      <CreateGroupPage open={open} setOpen={setOpen} fetchData={fetchData} />
    </>
  );
};
export default GroupPage;
