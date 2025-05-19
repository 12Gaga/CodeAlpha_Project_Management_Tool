import {
  Box,
  Button,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const sidebar = [
    { id: 1, label: "Dashboard", icon: <DashboardIcon />, route: "/dashboard" },
    { id: 2, label: "Groups", icon: <GroupIcon />, route: "/groups" },
    { id: 3, label: "Projects", icon: <AccountTreeIcon />, route: "/projects" },
  ];
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(152, 195, 232, 0.589)",
        }}
      >
        <img
          style={{ width: "100px" }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVM2hQ9KI6lnseVdlMaoJj2cTkRdr6TOB4GO46qUud4BBF5MHWO81LpJz-cdKfVajnJKw&usqp=CAU"
        />
        <Typography variant="h4">Kollab</Typography>
        <Button variant="contained">Log out</Button>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            width: "18%",
            backgroundColor: "#49919D",
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            height: "100vh",
          }}
        >
          <List>
            {sidebar.slice(0, 1).map((item) => (
              <Link
                key={item.id}
                to={item.route}
                style={{ textDecoration: "none" }}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "black" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {sidebar.slice(1).map((item) => (
              <Link
                to={item.route}
                style={{ textDecoration: "none" }}
                key={item.id}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{ color: "black" }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
        </Box>

        <Box sx={{ width: "80%", mt: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};
export default Layout;
