import Box from "@mui/material/Box";

import Sun from "./Sun";
import Cloud from "./Cloud";
import Wind from "./Wind";
import { IClouds, IRwy } from "../classes/IMetar";

type Props = {
  clouds: IClouds[];
  wspd: number;
  wdir: number;
  wgst: number;
  runways: IRwy[];
  timeLocal: string;
};

function SVGPanel({ clouds, wspd, wdir, wgst, runways, timeLocal }: Props) {
  return (
    <Box className="grid_container_Clouds_Wind">
      <Box>
        <Box className="sun-box">
          {clouds[0] === undefined && <Sun date={timeLocal} />}
          {clouds[0] && clouds[0].cover === "CAVOK" && <Sun date={timeLocal} />}
          {clouds[0] && clouds[0].cover === "NCD" && <Sun date={timeLocal} />}
          {clouds[0] && clouds[0].cover === "CLR" && <Sun date={timeLocal} />}
        </Box>

        <Box className="cloud-box">
          {clouds[0] &&
            clouds[0].cover !== "CAVOK" &&
            clouds[0].cover !== "NCD" &&
            clouds[0].cover !== "CLR" &&
            clouds.map((el) => (
              <Cloud key={el.base} base={el.base} cover={el.cover} />
            ))}
        </Box>
      </Box>
      <Box>
        {
          <Wind
            direction={wdir}
            speed={wspd}
            unit="kts"
            gusts={wgst}
            runways={runways}
          />
        }
      </Box>
    </Box>
  );
}

export default SVGPanel;
