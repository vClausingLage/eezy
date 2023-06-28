import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type DataProps = {
  data: { description: string; value: number | string }[];
  unit?: string;
  tempUnitToggle?: Function;
};

function DataView({ data, unit, tempUnitToggle }: DataProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          border: 1,
          borderColor: "primary.main",
          borderRadius: 2,
          mt: 2,
          mb: 2,
          overflow: "hidden",
        }}
      >
        {data &&
          data.map((el) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              key={el.description}
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
                <Typography sx={{ color: "white" }}>
                  {el.description}
                </Typography>
              </Box>
              <Box
                sx={{
                  pl: 2,
                  pr: 2,
                  pt: 0.4,
                  pb: 0.4,
                }}
              >
                <Typography display="inline" sx={{ fontWeight: "bold" }}>
                  {el.value}
                </Typography>
                <Typography display="inline">{unit}</Typography>
              </Box>
            </Box>
          ))}

        {tempUnitToggle && (
          <Box
            sx={{
              ml: 0.3,
              mr: 0.3,
              alignSelf: "center",
            }}
          >
            <Button
              onClick={() => {
                tempUnitToggle && tempUnitToggle(unit);
              }}
              variant="outlined"
            >
              {unit === "°C" ? "°F" : "°C"}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default DataView;
