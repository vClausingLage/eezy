import { Box, Typography } from "@mui/material";

type DataProps = { description: string; data: string | number | JSX.Element };

function DataView(props: DataProps) {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          border: 1,
          borderColor: "primary.main",
          borderRadius: 2,
          mt: 2,
          mb: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundColor: "primary.main",
            pl: 2,
            pr: 2,
            pt: 0.4,
            pb: 0.4,
          }}
        >
          <Typography sx={{ color: "white" }}>{props.description}</Typography>
        </Box>
        <Box>
          <Typography>{props.data}</Typography>
        </Box>
      </Box>
    </>
  );
}

export default DataView;
