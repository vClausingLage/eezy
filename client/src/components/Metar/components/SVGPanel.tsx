import Box from "@mui/material/Box";

import Sun from "./Sun";
import Cloud from "./Cloud";
import Wind from "./Wind";

type Props = {
  props: {
    cldCvg1: string;
    cldCvg2: string;
    cldCvg3: string;
    cldCvg4: string;
    cldBas1: string;
    cldBas2: string;
    cldBas3: string;
    cldBas4: string;
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
    <Box id="grid_container_Clouds_Wind">
      <Box>
        <Box id="sun-box">
          {props.cldCvg1 === "CAVOK" && <Sun date={props.timeLocal} />}
          {props.cldCvg1 === "NCD" && <Sun date={props.timeLocal} />}
          {props.cldCvg1 === "CLR" && <Sun date={props.timeLocal} />}
        </Box>

        <Box id="cloud-box">
          {props.cldBas1 && (
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
          )}
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
