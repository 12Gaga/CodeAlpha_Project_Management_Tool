import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Typography, Box, Button } from "@mui/material";
import CreateTask from "../../components/task/createTask";
import ShowTaskPage from "../../components/task/showTasks";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          "http://localhost:5000/project/getProject",
          {
            params: { projectId: id },
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log("Response:", res.data);
        setProjectInfo(res.data);
      } catch (err) {
        console.error(err);
      }
      try {
        const res = await axios.get("http://localhost:5000/task/getTasks", {
          params: { projectId: id },
          headers: { "Content-Type": "application/json" },
        });

        console.log("Response:", res.data);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Link to={`/projects`} style={{ textDecoration: "none" }}>
          <Typography sx={{ mr: 2 }}>Projects</Typography>
        </Link>
      </Box>
      {projectInfo.length > 0 && (
        <>
          <Box>
            <Typography>Project Name - {projectInfo[0].name}</Typography>
            <Typography>Description - {projectInfo[0].desc}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(true);
              }}
            >
              Add Task
            </Button>
          </Box>
        </>
      )}
      <CreateTask
        open={open}
        setOpen={setOpen}
        projectId={id}
        memberIds={projectInfo}
      />
      <Typography variant="h5" sx={{ textDecoration: "underline", my: 5 }}>
        Tasks
      </Typography>
      <ShowTaskPage tasks={tasks} />
    </>
  );
};
export default ProjectDetailPage;
