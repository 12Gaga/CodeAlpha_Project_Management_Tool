import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Typography, Box, Button } from "@mui/material";
import CreateTask from "../../components/task/createTask";
import ShowTaskPage from "../../components/task/showTasks";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteProjectPage from "../../components/project/deleteProject";
import { Config } from "../../config";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function fetchData() {
    try {
      const res = await axios.get(`${Config.apiBaseUrl}/project/getProject`, {
        params: { projectId: id },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      setProjectInfo(res.data);
    } catch (err) {
      console.error(err);
    }
    try {
      const res = await axios.get(`${Config.apiBaseUrl}/task/getTasks`, {
        params: { projectId: id },
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", res.data);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link to={`/projects`} style={{}}>
          <Typography sx={{ mr: 2, color: "secondary.main", mb: 1 }}>
            Projects
          </Typography>
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
      {projectInfo.length > 0 && (
        <>
          <Box>
            <Typography sx={{ fontSize: { xs: 18, sm: 20, lg: 25 } }}>
              Project Name - {projectInfo[0].name}
            </Typography>
            <Typography sx={{ fontSize: { xs: 14, lg: 18 }, mt: 1 }}>
              Description - {projectInfo[0].desc}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
              sx={{
                fontSize: { xs: 12, md: 14 },
                bgcolor: "secondary.main",
                color: "info.main",
              }}
            >
              Add Task
            </Button>
          </Box>
          <CreateTask
            open={open}
            setOpen={setOpen}
            projectId={id}
            memberIds={projectInfo}
            fetchData={fetchData}
          />
          <Typography
            sx={{
              textDecoration: "underline",
              my: { xs: 3, md: 4 },
              fontSize: { xs: 20, md: 23 },
            }}
          >
            Tasks
          </Typography>
          <ShowTaskPage tasks={tasks} />
          <DeleteProjectPage
            deleteOpen={deleteOpen}
            setDeleteOpen={setDeleteOpen}
            projectname={projectInfo[0].name}
            projectId={id}
          />
        </>
      )}
    </>
  );
};
export default ProjectDetailPage;
