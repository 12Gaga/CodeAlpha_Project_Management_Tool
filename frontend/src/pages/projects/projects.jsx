import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowProjectPage from "../../components/project/showProjects";
import { Config } from "../../config";

const ProjectPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${Config.apiBaseUrl}/project/getUserProjects`,
          {
            params: { userId: currentUser.id },
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
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Projects
      </Typography>
      <ShowProjectPage projects={projects} />
    </>
  );
};
export default ProjectPage;
