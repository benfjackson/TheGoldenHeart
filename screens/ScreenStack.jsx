
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Button, Text } from 'react-native';

import MainMenu from './MainMenu';

import CloudCastle from '../skins/CloudCastle';
import Forest from '../skins/Forest';
import MountainCastle from '../skins/MountainCastle';
import Mountain from '../skins/Mountain';
import Plains from '../skins/Plains';

import PlayScreen from './PlayScreen';

import Devil from '../skins/Devil';
import VampireGirl from '../skins/VampireGirl';

export default function HomeScreen() {
  
    const Stack = createStackNavigator();

  return (
    
        
        <Stack.Navigator initialRouteName="MainMenu" screenOptions={{headerShown: false}}>
            <Stack.Screen name="MainMenu" component={MainMenu} />
            <Stack.Screen name="CloudCastle" component={CloudCastle} />
            <Stack.Screen name="PlayScreen" component={PlayScreen} />
            <Stack.Screen name="Forest" component={Forest} />
            <Stack.Screen name="Devil" component={Devil} />
            <Stack.Screen name="VampireGirl" component={VampireGirl} />


        </Stack.Navigator>


  );
}