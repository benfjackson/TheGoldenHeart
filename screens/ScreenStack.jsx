import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets
} from '@react-navigation/stack';
import { Easing, Animated } from 'react-native';

import MainMenu from './MainMenu';
import SelectSkin from './SelectSkin';
import InGame from './InGame';

import { useEffect } from 'react';

export default function HomeScreen() {
  const Stack = createStackNavigator();

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
    // cardStyleInterpolator: ({ current, layouts }) => {
    //   return {
    //     cardStyle: {
    //       opacity: current.progress, // Apply opacity animation to the card
    //       transform: [
    //         {
    //           translateX: 0 // Maintain the screen's current position
    //         },
    //         {
    //           translateY: 0 // Maintain the screen's current position
    //         }
    //       ]
    //     }
    //   };
    // }
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

  return (
    <Stack.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: transitionConfig.cardStyleInterpolator,
        transitionSpec: transitionConfig.transitionSpec
        // ...TransitionPresets.FadeFromBottomAndroid,
        // transitionSpec: {
        //   open: {
        //     animation: 'timing',
        //     config: {
        //       duration: 500, // Animation duration in milliseconds
        //       easing: Easing.inOut(Easing.ease) // Easing function
        //     }
        //   },
        //   close: {
        //     animation: 'timing',
        //     config: {
        //       duration: 300,
        //       easing: Easing.inOut(Easing.ease)
        //     }
        //   }
        // }
      }}>
      <Stack.Screen name="MainMenu" component={MainMenu} />
      <Stack.Screen name="SelectSkin" component={SelectSkin} />
      <Stack.Screen name="InGame" component={InGame} />
    </Stack.Navigator>
  );
}
