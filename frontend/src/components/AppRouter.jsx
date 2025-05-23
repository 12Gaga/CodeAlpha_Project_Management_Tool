import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import "../App.css";
import Layout from "./layout";
import GroupPage from "../pages/groups/groups";
import ProjectPage from "../pages/projects/projects";
import LogInPage from "../pages/auth/login";
import GroupDetail from "../pages/groups/groupDetail";
import ProjectDetailPage from "../pages/projects/projectDetail";
import TaskDetailPage from "./task/taskDetail";
import TaskPage from "../pages/tasks/task";
const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogInPage />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<App />} />
            <Route path="/groups" element={<GroupPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/group/:id" element={<GroupDetail />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/task/:id" element={<TaskDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
