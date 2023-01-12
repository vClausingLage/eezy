import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView, TextInput, Button } from 'react-native';

export default function App() {

  const [input, inputChange] = useState('search airport')
  const [ergebnis, setErgebnis] = useState()

  // useEffect(() => {
  //   const airport = async (input) => {
  //     const result = await fetch('https://www.aviationweather.gov/adds/dataserver_current/current/' + 'httpparam?datasource=metars& requesttype=retrieve&format=xml&stationString=' + airport)
  //     const metar = result.json()
  //     return metar
  //   }
  //   setMetar(airport)
  // }, [])
  
  function searchMetar(e) {
    e.preventDefault()
    const metar = async (input) => {
    const result = await fetch('https://www.aviationweather.gov/adds/dataserver_current/current/' + 'httpparam?datasource=metars& requesttype=retrieve&format=xml&stationString=' + airport)
    const res = result.json()
    setErgebnis(res)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={inputChange}
        value={input}
        placeholder='search airport'
        keyboardType='default'
        spellCheck={false}
      />
      <Text>{input}</Text>
      <Button
        onPress={() => {setErgebnis('hi')}}
        title="search"
        color="#841584"
        accessibilityLabel="search airport"
      />
      <Text>{}</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 330,
    borderWidth: 1,
    padding: 1
  }
});
