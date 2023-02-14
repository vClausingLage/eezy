import { Box, Typography } from "@mui/material";

function AppFooter() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <Box>
      <Typography>© {year} Vincent Clausing-Lage </Typography>
    </Box>
  );
}

export default AppFooter;
