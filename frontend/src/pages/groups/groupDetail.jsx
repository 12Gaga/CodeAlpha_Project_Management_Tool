import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Typography, Box, Paper, Button, MenuItem } from "@mui/material";
import CreateProject from "../../components/project/createProject";
import ShowProjectPage from "../../components/project/showProjects";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteGroupPage from "../../components/group/deleteGroup";

const GroupDetail = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:5000/group/getGroup", {
        params: { groupId: id },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
    try {
      const res = await axios.get("http://localhost:5000/project/getProjects", {
        params: { groupId: id },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log("members", members);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to={`/groups`} style={{ textDecoration: "none" }}>
          <ArrowBackIosIcon sx={{ mb: 5, color: "secondary.main" }} />
        </Link>
        <Box>
          <DeleteOutlineIcon
            sx={{ fontSize: 25, color: "red" }}
            onClick={() => {
              setDeleteOpen(true);
            }}
          />
        </Box>
      </Box>

      {/* Show Group Info */}
      {members.length > 0 && (
        <>
          <Box
            sx={{
              display: { xs: "block", sm: "flex" },
              justifyContent: "space-between",
              color: "secondary.main",
            }}
          >
            <Typography sx={{ fontSize: { xs: 18, sm: 20, lg: 25 } }}>
              Group Name - {members[0].groupName}
            </Typography>
            <Typography
              sx={{
                my: { xs: 1, sm: 0 },
              }}
            >
              Created Time - {moment(members[0].createdTime).fromNow()}
            </Typography>
          </Box>

          <Typography color="secondary.main">Group Members </Typography>

          {members.map((m) => (
            <Paper>
              <MenuItem key={m.id} sx={{ mt: 1 }}>
                <img
                  src={m.profilePic}
                  style={{
                    width: "27px",
                    height: "27px",
                    borderRadius: "100%",
                    marginRight: "8px",
                  }}
                />
                {m.username}
              </MenuItem>
            </Paper>
          ))}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
              sx={{
                bgcolor: "secondary.main",
                color: "info.main",
                fontSize: { xs: 13, md: 15 },
              }}
            >
              Add Project
            </Button>
          </Box>

          {/* Show Projects Of This Group*/}
          <Typography
            sx={{
              textDecoration: "underline",
              my: { xs: 3, md: 4 },
              fontSize: { xs: 20, md: 23 },
            }}
          >
            Projects
          </Typography>
          <ShowProjectPage projects={projects} />
          <CreateProject
            open={open}
            setOpen={setOpen}
            groupId={id}
            fetchData={fetchData}
          />
          <DeleteGroupPage
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            groupName={members[0].groupName}
            groupId={id}
          />
        </>
      )}
    </>
  );
};

export default GroupDetail;
