import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export const App = () => {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app! Starting now...</Text>
      <StatusBar style="auto" />
    </View>
  );
}; // doing something

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
