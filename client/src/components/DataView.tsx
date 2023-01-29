import { Box, Typography } from "@mui/material";

type DataProps = { description: string; data: string | number };

function DataView(props: DataProps) {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          border: 1,
          borderColor: "#6985a7",
          borderRadius: 2,
        }}
      >
        <Typography sx={{ color: "#6985a7" }}>{props.description}</Typography>
        <hr />
        <Typography>{props.data}</Typography>
      </Box>
    </>
  );
}

export default DataView;
