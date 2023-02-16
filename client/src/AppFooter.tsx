import { Box, Typography } from "@mui/material";

function AppFooter() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <Box sx={{ position: "absolute", bottom: 0, height: "20px" }}>
      <Typography>© {year} Vincent Clausing-Lage </Typography>
    </Box>
  );
}

export default AppFooter;
