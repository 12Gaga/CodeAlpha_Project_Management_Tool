import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowTaskPage from "../../components/task/showTasks";

const TaskPage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://localhost:5000/task/getUserTasks", {
          params: { userId: currentUser.id },
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
      <Typography variant="h5">Tasks </Typography>
      <ShowTaskPage tasks={tasks} />
    </>
  );
};
export default TaskPage;
