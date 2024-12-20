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
        'Quadrants',
        'DeathAngel',
        'Island',
        'Mountain',
        'Plains',
        'Swamp',
        'Forest',
        'Devil',
        'Angel',
        'Kraken',
        'NobleVampire',
        'Waves'
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
        // justifyContent: 'between',
        backgroundColor: '#000'
        // alignItems: 'center',
        // paddingTop: '10%'
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainMenu');
        }}
        style={{
          backgroundColor: '#000',
          position: 'absolute',
          top: '10%',
          left: '2%',
          width: '12%',
          zIndex: 10
        }}>
        <Image source={BackButton} style={{ width: '100%', height: 35 }} />
      </TouchableOpacity>

      <View
        // style={{ paddingVertical: '35%' }}
        style={{
          flex: 1,
          // flexDirection: 'column',
          justifyContent: 'space-evenly',
          backgroundColor: 'black',
          alignItems: 'center',
          paddingTop: '40%',
          paddingBottom: '20%'
        }}>
        {/* paddingVertical: '25%' */}
        <View style={{ paddingTop: '10%' }}>
          <SkinCarousel
            startingHealth={startingHealth}
            favourites={favourites}
          />
        </View>
        <StartingHealthPicker setStartingHealth={setStartingHealth} />
      </View>
    </View>
  );
}
