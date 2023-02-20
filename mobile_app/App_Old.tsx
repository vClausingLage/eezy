import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  Button,
} from "react-native";
import { useState } from "react";

import {
  prepareMetar,
  reduceTempo,
  maptoMetarObj,
} from "./helpers/metar-regex";
import { IMetar } from "./helpers/IMetar";

export default function App() {
  const [icao, setIcao] = useState("");
  const [metarCode, setMetarCode] = useState<IMetar>();
  const [gafor, setGafor] = useState("");

  const searchIcao = async () => {
    const fetchMetar = await fetch(
      "https://api.met.no/weatherapi/tafmetar/1.0/metar?icao=" + icao
    );
    const data = await fetchMetar.text();
    let metarList = prepareMetar(data);
    let metarListReduced: string[][] = reduceTempo(metarList);
    let metarObj = maptoMetarObj(metarListReduced[0]);
    setMetarCode(metarObj);
    setGafor(metarObj.GAFOR);
  };

  const clouds = () => {
    if (metarCode?.Visibility === "CAVOK") {
      return "☼";
    } else if (metarCode?.Cloud_Layer[0].cloudLayer === "FEW") {
      return "☁";
    } else if (metarCode?.Cloud_Layer[0].cloudLayer === "SCT") {
      return "☁☁";
    } else if (metarCode?.Cloud_Layer[0].cloudLayer === "BKN") {
      return "☁☁☁";
    } else if (metarCode?.Cloud_Layer[0].cloudLayer === "OVC") {
      return "☁☁☁☁";
    } else {
      return "no cloud conclusion";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <TextInput
        style={styles.input}
        onChangeText={(input) => setIcao(input)}
        value={icao}
        placeholder="Airport ICAO Code"
        keyboardType="default"
      />
      <Button
        onPress={searchIcao}
        title="search"
        color="#841584"
        accessibilityLabel="button search ICAO Code"
      />
      <Text>QNH is {metarCode?.QNH}</Text>
      <Text>Flight Rules: {gafor}</Text>
      <Text>Cloud Layer: {clouds()}</Text>
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
