import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainMenu from './screens/MainMenu';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from './screens/ScreenStack';
export default function App() {
  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <NavigationContainer>
        {/* <MountainCastle/> */}
        {/* <MainMenu/> */}
        <HomeScreen />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',

    width: '100%',
    height: '100%'
  }
});
