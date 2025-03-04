// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from '@expo-google-fonts/dev';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import soundfile from './assets/audio/Mars.mp3';

// Ignore this error from the carousel package. Its within their library so beyond our reach
//It doesnt actually affect anything, so happy to ignore it
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
  'ViewPropTypes will be removed from React Native, along with all other PropTypes.',
  "ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."
]); // Ignore log notification by message

import ScreenStack from './screens/ScreenStack';

import { startBackgroundMusic } from './components/BackgroundMusic';
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    Endor: require('./assets/fonts/endor/ENDOR___.ttf'),
    Immortal: require('./assets/fonts/immortal/IMMORTAL.ttf')
  });

  // const audio = async () => {
  //   console.log('trying audio');
  //   await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  //   const { sound } = await Audio.Sound.createAsync(soundfile, {
  //     shouldPlay: true
  //   });
  //   sound.playAsync();
  //   console.log('played~!');
  // };
  // audio();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaProvider>
        <View style={styles.container}>
          {/* <StatusBar style="auto" /> */}
          <NavigationContainer>
            <ScreenStack />
          </NavigationContainer>
        </View>
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
