import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Typography, Box, Paper, Button, MenuItem } from "@mui/material";
import CreateProject from "../../components/project/createProject";
import ShowProjectPage from "../../components/project/showProjects";

const GroupDetail = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
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
        const res = await axios.get(
          "http://localhost:5000/project/getProjects",
          {
            params: { groupId: id },
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Response:", res.data);
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  console.log("members", members);
  return (
    <>
      <Link to={`/groups`} style={{ textDecoration: "none" }}>
        <ArrowBackIosIcon sx={{ mb: 5 }} />
      </Link>
      {/* Show Group Info */}
      {members.length > 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>Group Name - {members[0].groupName}</Typography>
            <Typography>
              Created Time - {moment(members[0].createdTime).fromNow()}
            </Typography>
          </Box>

          <Typography>Group Members </Typography>

          {members.map((m) => (
            <Paper>
              <MenuItem key={m.id} sx={{ width: 300, mt: 1 }}>
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
        </>
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Add Project
        </Button>
      </Box>

      {/* Show Projects Of This Group*/}
      <Typography variant="h5" sx={{ textDecoration: "underline", my: 5 }}>
        Projects
      </Typography>
      <ShowProjectPage projects={projects} />
      <CreateProject open={open} setOpen={setOpen} groupId={id} />
    </>
  );
};

export default GroupDetail;
