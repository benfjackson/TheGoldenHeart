import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs
} from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import Login from './Login';

import SelectSkin from './SelectSkin';
import InGame from './InGame';
import Tutorial from './Tutorial';

import { useEffect, useState } from 'react';
import ResumeGame from './ResumeGame';
import HomeScreen from './HomeScreen';

import Gallery from './Gallery';

import {
  checkHasCompletedTutorial,
  loadGameState
} from '../services/appStorage';
import { logError } from '../utils/logger';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
  cardStyle: { backgroundColor: 'transparent' },
  cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
  transitionSpec: {
    open: TransitionSpecs.FadeInFromBottomAndroidSpec,
    close: TransitionSpecs.FadeOutToBottomAndroidSpec
  }
};

export default function ScreenStack() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gameState, tutorialCompleted] = await Promise.all([
          loadGameState(),
          checkHasCompletedTutorial()
        ]);

        if (!tutorialCompleted) {
          setInitialRoute('Tutorial');
        } else if (gameState) {
          setInitialRoute('ResumeGame');
        } else {
          setInitialRoute('HomeScreen');
        }
      } catch (error) {
        logError('ScreenStack', 'Failed to load initial route', error);
        setInitialRoute('HomeScreen');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (initialRoute) {
      SplashScreen.hideAsync();
    }
  }, [initialRoute]);

  if (!initialRoute) return null;

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={screenOptions}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="ResumeGame" component={ResumeGame} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Gallery" component={Gallery} />
      <Stack.Screen name="SelectSkin" component={SelectSkin} />
      <Stack.Screen name="InGame" component={InGame} />
    </Stack.Navigator>
  );
}
