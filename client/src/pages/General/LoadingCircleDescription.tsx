import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import "./CSS/loadingCircleDescription.css";

type Props = {
  description: string;
};

function LoadingCircle({ description }: Props) {
  return (
    <Box className="loading-circle-description">
      <Typography display="inline">{description}</Typography>
      <CircularProgress color="primary" />
    </Box>
  );
}

export default LoadingCircle;
