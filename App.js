// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, StatusBar } from 'react-native';
// import MainMenu from './screens/MainMenu';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { AuthProvider } from './auth/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

import { SafeAreaProvider } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

import ScreenStack from './screens/ScreenStack';
export default function App() {
  const [fontsLoaded] = useFonts({
    Endor: require('./assets/fonts/endor/ENDOR___.ttf'),
    Immortal: require('./assets/fonts/immortal/IMMORTAL.ttf'),
    DarkElf: require('./assets/fonts/CWDRKAGE.ttf')
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaProvider>
        <AuthProvider>
          <View style={styles.container}>
            {/* <StatusBar style="auto" /> */}
            <NavigationContainer>
              <ScreenStack />
            </NavigationContainer>
          </View>
        </AuthProvider>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',

    width: '100%',
    height: '100%',
    flex: 1
  }
});
