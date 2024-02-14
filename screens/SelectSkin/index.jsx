import { set } from 'react-native-reanimated';
import SkinCarousel from './SkinCarousel';
import StartingHealthPicker from './StartingHealthPicker';

import { getFavourites, addToFavourites } from '../../services/appStorage';

import { useNavigation } from '@react-navigation/native';

import { useState } from 'react';

import { View, Image, TouchableOpacity, Text } from 'react-native';
import BackButton from '../../images/BackArrow1.png';

export default function SelectSkin() {
  //Get favourites from AsyncStorage
  const [favourites, setFavourites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [startingHealth, setStartingHealth] = useState(20);
  const navigation = useNavigation();

  if (!loaded) {
    getFavourites().then((favourites) => {
      // setFavourites(favourites);
      setFavourites([
        'Waves',
        'Devil'
        // 'Angel',
        // 'Plains',
        // 'Swamp',
        // 'Island',
        // 'Mountain',
        // 'Forest',
        // 'NobleVampire',
        // 'Kraken'
      ]);

      //Should put image loading in here

      setLoaded(true);
    });
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'black',
        alignItems: 'center'
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainMenu');
        }}
        style={{
          position: 'absolute',
          top: 40,
          left: 10,
          width: 50,
          height: 50,
          zIndex: 10
        }}>
        <Image source={BackButton} style={{ width: 50, height: 35 }} />
      </TouchableOpacity>

      <View style={{ paddingVertical: '25%' }}>
        {/* paddingVertical: '25%' */}
        <SkinCarousel startingHealth={startingHealth} favourites={favourites} />
        <StartingHealthPicker setStartingHealth={setStartingHealth} />
      </View>
    </View>
  );
}
