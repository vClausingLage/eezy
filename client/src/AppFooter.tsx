import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
