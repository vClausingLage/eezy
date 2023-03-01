import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";

function AppFooter() {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <Box>
      <Typography sx={{ color: "#495c75" }}>
        © {year} Vincent Clausing-Lage |{" "}
        <a
          href="https://github.com/vClausingLage/eezy"
          rel="noreferrer"
          target="_blank"
        >
          <GitHubIcon fontSize="inherit" sx={{ verticalAlign: "middle" }} />
        </a>
      </Typography>
    </Box>
  );
}

export default AppFooter;
