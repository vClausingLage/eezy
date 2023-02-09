import { Box, Typography, Button } from "@mui/material";

type DataProps = {
  description: string;
  value: string | number | number[];
  unit: string;
  tempUnitToggle?: Function;
};

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
        <Box
          sx={{
            pl: 2,
            pr: 2,
            pt: 0.4,
            pb: 0.4,
          }}
        >
          <Typography>{props.value}</Typography>
        </Box>
        {props.tempUnitToggle && (
          <Button
            onClick={() => {
              props.tempUnitToggle && props.tempUnitToggle();
            }}
            variant="outlined"
          >
            °F / °C
          </Button>
        )}
      </Box>
    </>
  );
}

export default DataView;
