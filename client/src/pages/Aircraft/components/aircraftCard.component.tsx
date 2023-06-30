import { useSelector, useDispatch } from "react-redux";
import { aircraftSelected } from "../../../features/redux/selectedAircraftSlice";

import {
  Card,
  IconButton,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { IAircraft } from "../interfaces/aircraft";

import "../CSS/aircraft-get.css";

type Props = {
  aircraft: IAircraft;
};

function AircraftCard({ aircraft }: Props) {
  const selectedAircraft = useSelector(
    (state: any) => state.selectedAircraft.object
  );
  const dispatch = useDispatch();

  const editAircraft = (id?: string) => {
    console.log("edit");
  };
  const deleteAircraft = async (id?: string) => {
    console.log("delete");
    if (id) {
      const response = await fetch(`/api/aircraft/create/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("delete aircraft response:", data);
    }
  };

  return (
    <Card>
      {selectedAircraft && (
        <CardContent>
          <Typography>
            {aircraft.manufacturer} {aircraft.model}
          </Typography>
          <Typography>{aircraft.registration_number}</Typography>
          <Button
            onClick={() => {
              dispatch(aircraftSelected(aircraft));
            }}
          >
            select Aircraft
          </Button>
          <Typography className="aircraft-selected">
            <IconButton
              onClick={() => editAircraft(aircraft.registration_number)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => deleteAircraft(aircraft.registration_number)}
            >
              <DeleteForeverIcon />
            </IconButton>
            <CheckIcon
              color={
                aircraft.registration_number ===
                selectedAircraft.registration_number
                  ? "success"
                  : "disabled"
              }
            />
          </Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default AircraftCard;
