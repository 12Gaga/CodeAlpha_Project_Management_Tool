import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Card, CardContent, Typography, Box } from "@mui/material";
import "./App.css";
import axios from "axios";
import { Config } from "./config";
import { green } from "@mui/material/colors";

function App() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${Config.apiBaseUrl}/task/getUserTasks`, {
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
  const processData = (tasks) => {
    const countsByDate = {};

    tasks.forEach((task) => {
      const date = task.deadline;
      const statusKey = task.status.trim().toLowerCase();
      if (!countsByDate[date]) {
        countsByDate[date] = { date, "to do": 0, progress: 0, done: 0 };
      }
      countsByDate[date][statusKey]++;
    });

    return Object.values(countsByDate).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
  };

  const chartData = processData(tasks);
  console.log("chartData", chartData);
  return (
    <>
      <Card
        sx={{
          width: { xs: 290, sm: 550, md: 650, lg: 700 },
          mx: "auto",
          my: 4,
          p: 2,
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: { xs: 16, sm: 18, lg: 25 } }}
            gutterBottom
          >
            Task Status Over Time
          </Typography>
          <Box sx={{ width: "100%", height: { xs: 250, sm: 300, lg: 400 } }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Line dataKey="to do" stroke="#8884d8" />
                <Line dataKey="progress" stroke="#82ca9d" />
                <Line dataKey="done" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Card
          sx={{
            width: { xs: 150, lg: 200 },
            mr: 2,
            mt: { xs: 1.5, md: 2 },
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: { xs: 15, md: 16, lg: 18 } }}>
              ALL TASKS
            </Typography>
            <Typography>{tasks.length}</Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: { xs: 150, lg: 200 },
            mr: 2,
            mt: { xs: 1.5, md: 2 },
            bgcolor: "#DFE3CE",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: { xs: 15, md: 16, lg: 18 } }}>
              TO DO
            </Typography>
            <Typography>
              {tasks.filter((t) => t.status.trim() === "TO DO").length}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: { xs: 150, lg: 200 },
            mr: 2,
            mt: { xs: 1.5, md: 2 },
            bgcolor: "primary.main",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: { xs: 15, md: 16, lg: 18 } }}>
              PROGRESS
            </Typography>
            <Typography>
              {tasks.filter((t) => t.status.trim() === "PROGRESS").length}
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: { xs: 150, lg: 200 },
            mr: 2,
            mt: { xs: 1.5, md: 2 },
            bgcolor: "#2E7D32",
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: { xs: 15, md: 16, lg: 18 } }}>
              DONE
            </Typography>
            <Typography>
              {tasks.filter((t) => t.status.trim() === "DONE").length}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default App;
