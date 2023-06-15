import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';
import { Easing } from 'react-native';

import MainMenu from './MainMenu';
import SelectSkin from './SelectSkin';
import InGame from './InGame';

export default function HomeScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.FadeFromBottomAndroid,
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 500, // Animation duration in milliseconds
              easing: Easing.inOut(Easing.ease) // Easing function
            }
          },
          close: {
            animation: 'timing',
            config: {
              duration: 300,
              easing: Easing.inOut(Easing.ease)
            }
          }
        }
      }}>
      <Stack.Screen name="MainMenu" component={MainMenu} />
      <Stack.Screen name="SelectSkin" component={SelectSkin} />
      <Stack.Screen name="InGame" component={InGame} />
    </Stack.Navigator>
  );
}
