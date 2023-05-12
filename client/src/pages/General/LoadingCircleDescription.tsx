import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import "./CSS/loadingCircleDescription.css";

type Props = {
  description: string;
};

function LoadingCircle(props: Props) {
  return (
    <Box className="loading-circle-description">
      <Typography display="inline">{props.description}</Typography>
      <CircularProgress color="primary" />
    </Box>
  );
}

export default LoadingCircle;
