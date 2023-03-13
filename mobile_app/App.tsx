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

export default function App() {
  const [icao, setIcao] = useState("");
  const [metarString, setMetarString] = useState("");
  const [query, setQuery] = useState("");
  const [alert, setAlert] = useState(false);

  function searchIcao() {
    setIcao(query);
    console.log("search");
  }

  useEffect(() => {
    console.log("useEffect");
    async function fetchMetar() {
      const response = await fetch(
        `https://beta.aviationweather.gov/cgi-bin/data/metar.php?ids=${query}`
      );
      const data = await response.text();
      setMetarString(data);
      console.log(data);
    }
    if (query.length === 4) fetchMetar();
    else setAlert(true);
  }, [icao]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <TextInput
        style={styles.input}
        onChangeText={(el) => setQuery(el)}
        value={query}
        placeholder="Airport ICAO Code"
        keyboardType="default"
      />
      {alert && <Text>provide valid ICAO Code</Text>}
      <Button
        onPress={searchIcao}
        title="search"
        color="#841584"
        accessibilityLabel="button search ICAO Code"
      />
      <Text>{query}</Text>
      <Text>{icao}</Text>
      <Text>{metarString}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  input: {
    height: 40,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 5,
    borderWidth: 1,
    padding: 10,
  },
});
