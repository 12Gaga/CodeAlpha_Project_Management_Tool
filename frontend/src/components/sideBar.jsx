import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

const SideBarPage = ({ sidebar }) => {
  return (
    <>
      <List>
        {sidebar.slice(0, 1).map((item) => (
          <Link
            key={item.id}
            to={item.route}
            style={{ textDecoration: "none" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "info.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ color: "info.main" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider sx={{ bgcolor: "info.main" }} />
      <List>
        {sidebar.slice(1).map((item) => (
          <Link
            to={item.route}
            style={{ textDecoration: "none" }}
            key={item.id}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ color: "info.main" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ color: "info.main" }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider sx={{ bgcolor: "info.main" }} />
    </>
  );
};

export default SideBarPage;
