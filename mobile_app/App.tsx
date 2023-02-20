import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  Button,
} from "react-native";
import { useState, useEffect } from "react";

import { convertDate, getFlightRules } from "./Metar/metar-ui-helper";
import { IAirportObject, IMetarObject } from "./Metar/IMetar";

export default function App() {
  const [responseError, setResponse] = useState(false);
  const [metar, setMetar] = useState<any>({}); //! make interface
  const [disabled, setDisabled] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [alertIcao, setAlertIcao] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [airportObject, setAirportObject] = useState({} as IAirportObject);
  const [metarObject, setMetarObject] = useState({
    icao: "",
    tempUnit: "°C",
  } as IMetarObject);

  function tempUnitToggle(unit: string) {
    // ! add return
    if (unit === "°C") {
      setMetarObject({ ...metarObject, tempUnit: "°F" });
    } else if (unit === "°F") {
      setMetarObject({ ...metarObject, tempUnit: "°C" });
    }
  }

  const loading = (
    <Box
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setMetarObject({
      ...metarObject,
      icao: event.target.value.toUpperCase(),
    });
    if (event.target.value.length === 4) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setAlertIcao(false);
  }

  async function searchMetar(e: React.SyntheticEvent) {
    e.preventDefault();
    if (metarObject.icao.length !== 4) setAlertIcao(true);
    setIsLoading(true);
    const response = await fetch(`/api/${metarObject.icao}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.message && data.message === "error") {
      setResponse(true);
      setIsLoading(false);
    } else {
      setResponse(false);
      setMetar(data);
      setMetarObject({
        ...metarObject,
        visibility: {
          ...metarObject.visibility,
          meters:
            parseInt(data.visib) >= 621
              ? 9999
              : Math.round((parseInt(data.visib) * 16.0934) / 100) * 100,
          miles: parseInt(data.visib),
        },
        nosig: /NOSIG/gi.test(data.rawOb) ? true : false,
        CAVOK: /CAVOK/gi.test(data.rawOb)
          ? true
          : /CLR/gi.test(data.rawOb)
          ? true
          : /NCD/gi.test(data.rawOb)
          ? true
          : false,
        time: convertDate(data.obsTime + "000"),
      });
      const airportDBresponse = await fetch(
        `https://airportdb.io/api/v1/airport/${metarObject.icao}?apiToken=${airportDBKey}`
      );
      const airportDBData = await airportDBresponse.json();
      setAirportObject({
        frequencies: airportDBData.freqs,
        runways: airportDBData.runways,
      });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (metar !== undefined && metarObject.visibility !== undefined) {
      const flightRuleColor = getFlightRules(
        metarObject.CAVOK ? "CAVOK" : metarObject.visibility.meters,
        parseInt(metar.cldBas1)
      );
      setMetarObject({ ...metarObject, flightRule: flightRuleColor });
      // console.log("fetched Metar", metar);
      // console.log("obj", metarObject);
      if (metar.rawOb !== undefined)
        console.log("tempo Gusts Warning", tempoGusts(metar.rawOb));
    }
  }, [metar]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <TextInput
        style={styles.input}
        onChangeText={() => console.log("moin")}
        value={}
        placeholder="Airport ICAO Code"
        keyboardType="default"
      />
      <Button
        onPress={}
        title="search"
        color="#841584"
        accessibilityLabel="button search ICAO Code"
      />
      <Text>QNH is </Text>
      <Text>Flight Rules: </Text>
      <Text>Cloud Layer: </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
