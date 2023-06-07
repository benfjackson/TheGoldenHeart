import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Button, Text } from 'react-native';

import MainMenu from './MainMenu';
import SelectSkin from './SelectSkin';
import InGame from './InGame';

// import CloudCastle from '../skins/CloudCastle';
// import Forest from '../skins/Forest';
// import Devil from '../skins/Devil';
// import VampireGirl from '../skins/VampireGirl';
// import GloriousElk from '../skins/GloriousElk';
// import Kraken from '../skins/Kraken';
// import LightningDragon from '../skins/LightningDragon';
// import Angel from '../skins/Angel';
// import Arisen from '../skins/Arisen';
// import Druid from '../skins/Druid';
// import HallOfSpirits from '../skins/HallOfSpirits';
// import TheUnborn from '../skins/TheUnborn';
// import WereWolf from '../skins/WereWolf';

export default function HomeScreen() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="MainMenu"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainMenu" component={MainMenu} />
      <Stack.Screen name="SelectSkin" component={SelectSkin} />
      <Stack.Screen name="InGame" component={InGame} />
      {/* 
      <Stack.Screen name="Devil" component={Devil} />
      <Stack.Screen name="VampireGirl" component={VampireGirl} />
      <Stack.Screen name="GloriousElk" component={GloriousElk} />
      <Stack.Screen name="Kraken" component={Kraken} />
      <Stack.Screen name="LightningDragon" component={LightningDragon} />

      <Stack.Screen name="CloudCastle" component={CloudCastle} />
      <Stack.Screen name="Forest" component={Forest} />

      <Stack.Screen name="Angel" component={Angel} />
      <Stack.Screen name="Arisen" component={Arisen} />
      <Stack.Screen name="Druid" component={Druid} />
      <Stack.Screen name="HallOfSpirits" component={HallOfSpirits} />
      <Stack.Screen name="TheUnborn" component={TheUnborn} />
      <Stack.Screen name="WereWolf" component={WereWolf} /> */}
    </Stack.Navigator>
  );
}
