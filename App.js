// import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { NavigationBar } from 'expo-navigation-bar';
// import MainMenu from './screens/MainMenu';
import 'react-native-gesture-handler';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000000'
  }
};
import { useFonts } from 'expo-font';
import { AuthProvider } from './auth/AuthContext';
import * as SplashScreen from 'expo-splash-screen';

import {
  SafeAreaProvider,
  useSafeAreaInsets
} from 'react-native-safe-area-context';

import ErrorBoundary from './components/ErrorBoundary';
import ScreenStack from './screens/ScreenStack';
import { installGlobalErrorHandlers, logError } from './utils/logger';

SplashScreen.preventAutoHideAsync();
installGlobalErrorHandlers();

function AppShell() {
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === 'android' ? 0 : insets.top;
  const bottomInset = Platform.OS === 'android' ? 0 : insets.bottom;

  return (
    <ErrorBoundary>
      <AuthProvider>
        {Platform.OS === 'android' && <NavigationBar hidden style="light" />}
        <View
          style={[
            styles.container,
            {
              paddingTop: topInset,
              paddingBottom: bottomInset
            }
          ]}>
          <NavigationContainer
            theme={navigationTheme}
            onUnhandledAction={(action) => {
              logError('Navigation', 'Unhandled navigation action', action.type, {
                payload: action.payload
              });
            }}>
            <ScreenStack />
          </NavigationContainer>
        </View>
      </AuthProvider>
    </ErrorBoundary>
  );
}

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
      <StatusBar hidden translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaProvider>
        <AppShell />
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
