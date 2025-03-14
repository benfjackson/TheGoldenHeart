import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';
import { Easing, Animated, View, Text } from 'react-native';

import SelectSkin from './SelectSkin';
import InGame from './InGame';
import Tutorial from './Tutorial';

import { useEffect, useState } from 'react';
import ResumeGame from './ResumeGame';
import HomeScreen from './HomeScreen';
import Login from './Login';
import {
  checkHasCompletedTutorial,
  loadGameState
} from '../services/appStorage';
import Gallery from './Gallery';
import RequiresAccount from './RequiresAccount';

import { useAuth } from '../auth/AuthContext';

export default function ScreenStack() {
  const Stack = createStackNavigator();
  const { session, loading } = useAuth();

  useEffect(() => {
    setTimeout(() => {
      // Code to navigate to the next screen
    }, 1000); // Delay in milliseconds
  }, []);

  const transitionConfig = {
    transitionSpec: {
      open: {
        animation: 'timing',
        config: {
          duration: 1000,
          easing: Easing.inOut(Easing.ease)
        }
      },
      close: {
        animation: 'timing',
        config: {
          duration: 1000,
          easing: Easing.inOut(Easing.ease)
        }
      }
    },

    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          backgroundColor: 'black'
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          backgroundColor: 'black'
        }
      };
    }
  };

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
          setInitialRoute('HomeScreen'); // Default route
        }
      } catch (error) {
        console.error('Error loading app state:', error);
        setInitialRoute('HomeScreen'); // Fallback route
      }
    };

    fetchData();
  }, []);

  if (!initialRoute)
    return (
      <View>
        <Text>Beans</Text>
      </View>
    );

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: transitionConfig.cardStyleInterpolator,
        transitionSpec: transitionConfig.transitionSpec
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Tutorial" component={Tutorial} />
      <Stack.Screen name="ResumeGame" component={ResumeGame} />

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Gallery">
        {() => (
          <RequiresAccount>
            <Gallery />
          </RequiresAccount>
        )}
      </Stack.Screen>

      <Stack.Screen name="SelectSkin" component={SelectSkin} />
      <Stack.Screen name="InGame" component={InGame} />
    </Stack.Navigator>
  );
}
