import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function LoadingCircle() {
  return (
    <Box
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}

export default LoadingCircle;
