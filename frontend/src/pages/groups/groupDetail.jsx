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
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Config } from "../../config";
import AddMemberPage from "../../components/group/addMember";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";

const GroupDetail = () => {
  const { id } = useParams();
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [adddMemberOpen, setAddMemberOpen] = useState(false);

  async function fetchData() {
    try {
      const res = await axios.get(`${Config.apiBaseUrl}/group/getGroup`, {
        params: { groupId: id },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      setMembers(res.data);
    } catch (err) {
      console.error(err);
    }
    try {
      const res = await axios.get(`${Config.apiBaseUrl}/project/getProjects`, {
        params: { groupId: id },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleRemoveMember = async (memberId) => {
    try {
      const res = await axios.delete(
        `${Config.apiBaseUrl}/group/removeMember`,
        {
          params: { groupId: id, memberId },
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Response:", res.data);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

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
          <GroupAddIcon
            sx={{ fontSize: 25, color: "secondary.main" }}
            onClick={() => {
              setAddMemberOpen(true);
            }}
          />
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
              <MenuItem key={m.id} sx={{ mt: 1, position: "relative" }}>
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
                <Box sx={{ position: "absolute", right: 5 }}>
                  <GroupRemoveIcon
                    onClick={() => handleRemoveMember(m.userId)}
                  />
                </Box>
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
          <AddMemberPage
            setAddMemberOpen={setAddMemberOpen}
            addMemberOpen={adddMemberOpen}
            groupId={id}
            fetchData={fetchData}
          />
        </>
      )}
    </>
  );
};

export default GroupDetail;
