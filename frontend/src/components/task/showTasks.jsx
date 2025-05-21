import { Box, Card, CardContent, Typography, MenuItem } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";

const ShowTaskPage = ({ tasks }) => {
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {tasks.map((t) => {
          const daysLeft = moment(t.deadline).diff(moment(), "days");
          return (
            <Link to={`/task/${t.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ width: 250, mr: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ color: "text.secondary", mb: 1.5 }}
                  >
                    {t.name}
                  </Typography>

                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    Assignee
                  </Typography>
                  <MenuItem sx={{ p: 0, py: 1 }}>
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
                  <Typography>
                    Deadline: {moment(t.deadline).format("DD MMM YYYY")}
                  </Typography>
                  {daysLeft >= 0 ? (
                    <Typography>{daysLeft} day(s) left</Typography>
                  ) : (
                    <Typography style={{ color: "red" }}>
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
