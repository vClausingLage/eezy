import DataView from "./DataView.component";

import { formatWeatherString } from "../helper/metar-ui-helper";

import Box from "@mui/material/Box";

type Props = {
  props: {
    altim: number;
    slp: number;
    temp: number;
    dewp: number;
    tempUnitToggle: Function;
    tempUnit: string;
    wxString: string;
    visibilityMeters: number;
  };
};

function DataPanel({ props }: Props) {
  function tempUnitToggle() {}

  return (
    <Box id="weather-data">
      {props.slp !== null && props.altim === null && (
        <DataView
          data={[
            {
              description: "SLP",
              value: Math.round(props.slp / 10),
            },
          ]}
          unit={"hPa"}
        ></DataView>
      )}
      {props.altim !== null && props.slp === null && (
        <DataView
          data={[
            {
              description: "QNH",
              value: Math.round(props.altim / 10),
            },
          ]}
          unit={"hPa"}
        ></DataView>
      )}
      {props.slp !== null && props.altim !== null && (
        <DataView
          data={[
            {
              description: "QNH",
              value: Math.round(props.altim / 10),
            },
            {
              description: "SLP",
              value: Math.round(props.slp / 10),
            },
          ]}
          unit={"hPa"}
        ></DataView>
      )}
      <DataView
        data={[
          {
            description: "Visibility",
            value: props.visibilityMeters,
          },
        ]}
        unit={"m"}
      ></DataView>
      {props.wxString && (
        <DataView
          data={[
            {
              description: "Precipitation",
              value: formatWeatherString(props.wxString),
            },
          ]}
        ></DataView>
      )}
      {props.tempUnit === "°C" ? (
        <>
          <DataView
            data={[
              {
                description: "Temperature",
                value: Math.round(props.temp / 10),
              },
              {
                description: "Dewpoint",
                value: Math.round(props.dewp / 10),
              },
            ]}
            unit={props.tempUnit}
            tempUnitToggle={() => props.tempUnitToggle(props.tempUnit)}
          ></DataView>
        </>
      ) : (
        <>
          <DataView
            data={[
              {
                description: "Temperature",
                value: Math.round(((props.temp / 10) * 9) / 5 + 32),
              },
              {
                description: "Dewpoint",
                value: Math.round(((props.dewp / 10) * 9) / 5 + 32),
              },
            ]}
            unit={props.tempUnit}
            tempUnitToggle={() => props.tempUnitToggle(props.tempUnit)}
          ></DataView>
        </>
      )}
    </Box>
  );
}

export default DataPanel;
