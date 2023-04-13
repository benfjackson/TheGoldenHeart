
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import MountainCastle from '../skins/MountainCastle';

export default function GamePage() {
  
  const SkinDrawer = createDrawerNavigator();

  return (
    <MountainCastle />
    // <NavigationContainer>
    //   <SkinDrawer.Navigator initialRouteName="Forest">
    //     <SkinDrawer.Screen name="Forest" component={Forest} />
    //   </SkinDrawer.Navigator>
    // </NavigationContainer>
    
  );
}