import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState } from "react";
import CreateGroupPage from "../../components/group/createGroup";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Config } from "../../config";
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
      const res = await axios.get(`${Config.apiBaseUrl}/group/getGroups`, {
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
        <GroupsIcon
          sx={{ fontSize: { xs: 35, sm: 40 }, color: "secondary.main" }}
          onClick={() => {
            setOpen(true);
          }}
        />
      </Box>
      <Typography
        sx={{
          my: 4,
          textDecoration: "underline",
          fontSize: { xs: 23, sm: 25 },
        }}
        color="secondary.main"
      >
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
              <Card
                sx={{
                  width: { xs: 120, sm: 150 },
                  mr: 3,
                  bgcolor: "secondary.light",
                  p: { xs: 1, md: 2 },
                  mt: { xs: 1, sm: 2 },
                }}
              >
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
                    <Typography
                      component="div"
                      color="info.main"
                      sx={{ fontSize: { xs: 20, sm: 25 } }}
                    >
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
