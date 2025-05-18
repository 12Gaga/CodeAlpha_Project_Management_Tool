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
        <Layout>
          <Routes>
            <Route path="/" Component={LogInPage} />
            <Route path="/dashboard" Component={App} />
            <Route path="/groups" Component={GroupPage} />
            <Route path="/projects" Component={ProjectPage} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
