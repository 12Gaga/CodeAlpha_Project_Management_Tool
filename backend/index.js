import express from "express";
import cors from "cors";
import db from "./db.js";

import authRoute from "./routes/auth.js";
import groupRoute from "./routes/groups.js";
import userRoute from "./routes/users.js";
import projectRoute from "./routes/projects.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/group", groupRoute);
app.use("/users", userRoute);
app.use("/project", projectRoute);

app.listen(5000, () => {
  console.log("server is running....");
});
