import { Box, Typography } from "@mui/material";

type DataProps = { description: string; data: string | number };

function DataView(props: DataProps) {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          border: 1,
          borderColor: "primary.main",
          borderRadius: 2,
        }}
      >
        <Typography sx={{ color: "primary.main" }}>
          {props.description}
        </Typography>
        <hr />
        <Typography>{props.data}</Typography>
      </Box>
    </>
  );
}

export default DataView;
