import Box from "@mui/material/Box";

import Sun from "./Sun";
import Cloud from "./Cloud";
import Wind from "./Wind";
import { IClouds } from "../classes/IMetar";

type Props = {
  props: {
    clouds: IClouds[];
    wspd: number;
    wdir: number;
    wgst: number;
    runways: IRwy[];
    timeLocal: string;
  };
};

type IRwy = {
  he_ident: string;
  le_ident: string;
};

function SVGPanel({ props }: Props) {
  return (
    <Box className="grid_container_Clouds_Wind">
      <Box>
        <Box className="sun-box">
          {props.clouds[0].cover === "CAVOK" && <Sun date={props.timeLocal} />}
          {props.clouds[0].cover === "NCD" && <Sun date={props.timeLocal} />}
          {props.clouds[0].cover === "CLR" && <Sun date={props.timeLocal} />}
        </Box>

        <Box className="cloud-box">
          {typeof props.clouds[0].cover != "string" &&
            props.clouds.map((el) => <Cloud base={el.base} cover={el.cover} />)}
        </Box>
      </Box>
      <Box>
        {props.wdir && (
          <Wind
            direction={props.wdir}
            speed={props.wspd}
            unit="kts"
            gusts={props.wgst}
            runways={props.runways}
          />
        )}
      </Box>
    </Box>
  );
}

export default SVGPanel;
