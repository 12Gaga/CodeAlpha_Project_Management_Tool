import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Typography, Box, Button } from "@mui/material";
import CreateTask from "../../components/task/createTask";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState([]);
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
    }
    fetchData();
  }, []);
  return (
    <>
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
    </>
  );
};
export default ProjectDetailPage;
