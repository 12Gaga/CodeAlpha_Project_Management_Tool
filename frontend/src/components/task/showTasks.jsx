import {
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  Chip,
} from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";

const ShowTaskPage = ({ tasks }) => {
  const getColor = (status) => {
    switch (status.trim()) {
      case "DONE":
        return "success";
      case "PROGRESS":
        return "primary";
      default:
        return "default";
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tasks.map((t) => {
          const daysLeft = moment(t.deadline).diff(moment(), "days");
          return (
            <Link to={`/task/${t.id}`} style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  width: { xs: 250, md: 300 },
                  mr: 2,
                  mt: { xs: 1.5, md: 2 },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "text.secondary",
                        mb: 1.5,
                        fontSize: { xs: 17, md: 20 },
                      }}
                    >
                      {t.name}
                    </Typography>
                    <Chip
                      label={t.status}
                      color={getColor(t.status)}
                      sx={{ fontSize: { xs: 10, md: 12 } }}
                    />
                  </Box>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      mb: 1.5,
                      fontSize: { xs: 14, md: 16 },
                    }}
                  >
                    Assignee
                  </Typography>
                  <MenuItem sx={{ p: 0, py: 1, fontSize: { xs: 14, md: 16 } }}>
                    <img
                      src={t.profilePic}
                      style={{
                        width: "27px",
                        height: "27px",
                        borderRadius: "100%",
                        marginRight: "8px",
                      }}
                    />
                    {t.username}
                  </MenuItem>
                  <Typography
                    sx={{
                      fontSize: { xs: 14, md: 16 },
                      color: "secondary.main",
                    }}
                  >
                    Deadline: {moment(t.deadline).format("DD MMM YYYY")}
                  </Typography>
                  {daysLeft >= 0 ? (
                    <Typography
                      sx={{
                        fontSize: { xs: 14, md: 16 },
                        color: "secondary.main",
                      }}
                    >
                      {daysLeft} day(s) left
                    </Typography>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: { xs: 14, md: 16 },
                        color: "secondary.main",
                      }}
                    >
                      Deadline passed {Math.abs(daysLeft)} day(s) ago
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </Box>
    </>
  );
};
export default ShowTaskPage;
