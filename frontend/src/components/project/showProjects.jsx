import { Box, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";

const ShowProjectPage = ({ projects }) => {
  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {projects.map((p) => (
          <Link
            to={`/project/${p.id}`}
            key={p.id}
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ width: 250, mr: 2, mt: 2 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary", mb: 1.5 }}
                >
                  {p.name}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  {moment(p.createdAt).fromNow()}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </>
  );
};
export default ShowProjectPage;
