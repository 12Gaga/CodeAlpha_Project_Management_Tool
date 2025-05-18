import { Box, Typography } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useState } from "react";
import CreateGroupPage from "../../components/group/createGroup";
const GroupPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <GroupAddIcon
          sx={{ fontSize: 40 }}
          onClick={() => {
            setOpen(true);
          }}
        />
      </Box>
      <CreateGroupPage open={open} setOpen={setOpen} />
    </>
  );
};
export default GroupPage;
