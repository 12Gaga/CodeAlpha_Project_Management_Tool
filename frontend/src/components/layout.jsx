import { Box, Button, Typography, Drawer } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Outlet } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import SideBarPage from "./sideBar";

const Layout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const sidebar = [
    { id: 1, label: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { id: 2, label: "Groups", icon: <GroupIcon />, route: "/groups" },
    { id: 3, label: "Projects", icon: <AccountTreeIcon />, route: "/projects" },
    { id: 4, label: "My Tasks", icon: <AccountTreeIcon />, route: "/tasks" },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "primary.main",
        }}
      >
        <img style={{ width: "130px", height: "100px" }} src="Kollab.png" />
        <Button
          variant="contained"
          onClick={handleLogOut}
          sx={{
            bgcolor: "secondary.main",
            display: { xs: "none", md: "block" },
            color: "info.main",
          }}
        >
          Log out
        </Button>
        <MoreVertIcon
          onClick={() => {
            setOpen(true);
          }}
          sx={{ display: { xs: "block", md: "none" }, fontSize: 30 }}
        />
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: { md: "25%", lg: "18%" },
            backgroundColor: "primary.dark",
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            height: "100vh",
            display: { xs: "none", md: "block" },
          }}
        >
          <SideBarPage sidebar={sidebar} />
        </Box>

        <Box sx={{ width: { xs: "100%", md: "80%" }, mt: 3, pl: 3 }}>
          <Outlet />
        </Box>
      </Box>

      <Drawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onClick={() => {
          setOpen(false);
        }}
        PaperProps={{
          sx: {
            borderTopRightRadius: 16,
            padding: 2,
            bgcolor: "primary.dark",
          },
        }}
      >
        <SideBarPage sidebar={sidebar} />
        <Button
          variant="contained"
          onClick={handleLogOut}
          sx={{ bgcolor: "primary.main", mt: 3, color: "info.main" }}
        >
          Log out
        </Button>
      </Drawer>
    </>
  );
};
export default Layout;
