import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Layout from "./layout";
import GroupPage from "../pages/groups/groups";
import ProjectPage from "../pages/projects/projects";
import LogInPage from "../pages/auth/login";
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
