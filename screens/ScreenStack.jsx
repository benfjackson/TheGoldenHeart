import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Button, Text } from 'react-native';

import MainMenu from './MainMenu';
import PlayScreen from './PlayScreen';

import CloudCastle from '../skins/CloudCastle';
import Forest from '../skins/Forest';
import Devil from '../skins/Devil';
import VampireGirl from '../skins/VampireGirl';
import GloriousElk from '../skins/GloriousElk';
import Kraken from '../skins/Kraken';
import LightningDragon from '../skins/LightningDragon';

export default function HomeScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MainMenu"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainMenu" component={MainMenu} />
      <Stack.Screen name="PlayScreen" component={PlayScreen} />

      <Stack.Screen name="Devil" component={Devil} />
      <Stack.Screen name="VampireGirl" component={VampireGirl} />
      <Stack.Screen name="GloriousElk" component={GloriousElk} />
      <Stack.Screen name="Kraken" component={Kraken} />
      <Stack.Screen name="LightningDragon" component={LightningDragon} />

      <Stack.Screen name="CloudCastle" component={CloudCastle} />
      <Stack.Screen name="Forest" component={Forest} />
    </Stack.Navigator>
  );
}
