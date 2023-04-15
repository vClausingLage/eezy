import Box from "@mui/material/Box";

import Sun from "./Sun";
import Cloud from "./Cloud";
import Wind from "./Wind";
import { IClouds } from "../classes/IMetar";

type Props = {
  props: {
    clouds: IClouds[];
    wspd: string;
    wdir: string;
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
          {props.clouds.map((el) => (
            <Cloud cloudBase={el.base} cloudLayer={el.cover} />
          ))}
          {/* {props.cldBas1 && (
            <Cloud
              cloudBase={parseInt(props.cldBas1)}
              cloudLayer={props.cldCvg1}
            ></Cloud>
          )}
          {props.cldBas2 && (
            <Cloud
              cloudBase={parseInt(props.cldBas2)}
              cloudLayer={props.cldCvg2}
            ></Cloud>
          )}
          {props.cldBas3 && (
            <Cloud
              cloudBase={parseInt(props.cldBas3)}
              cloudLayer={props.cldCvg3}
            ></Cloud>
          )}
          {props.cldBas4 && (
            <Cloud
              cloudBase={parseInt(props.cldBas4)}
              cloudLayer={props.cldCvg4}
            ></Cloud>
          )} */}
        </Box>
      </Box>
      <Box>
        {props.wdir && (
          <Wind
            direction={parseInt(props.wdir)}
            speed={parseInt(props.wspd)}
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
