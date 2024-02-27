import { StatusBar } from 'expo-status-bar';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import TopBar from "./component/TopBar";

export default function App() {
  return (
      <View>
          <TopBar />
        <ScrollView>
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
        </ScrollView>
      </View>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
