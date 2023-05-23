import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Hero from "./components/Hero";
import LoginButton from "./components/loginButton";

import cloudsImg from "./assets/clouds.jpg";

import "./CSS/index.css";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

function IndexPage() {
  return (
    <Box>
      <Box className="hero-container">
        <Box>
          <LoginButton />
        </Box>
        <Box>
          <Typography variant="h3" className="hero-text">
            welcome to the EEzy Flight Planner
          </Typography>
        </Box>
        <Box>
          <Hero />
        </Box>
      </Box>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h5">
            stay ahead of changing weather with our METAR App
          </Typography>
        </Grid>
        <Grid item>
          <Img src={cloudsImg} alt="clouds" className="clouds" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default IndexPage;
