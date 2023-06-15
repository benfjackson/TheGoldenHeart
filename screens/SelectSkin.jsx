import { set } from 'react-native-reanimated';
import SkinCarousel from './SkinCarousel';

import { getFavourites, addToFavourites } from '../services/appStorage';

import { useNavigation } from '@react-navigation/native';

import { useState } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

export default function SelectSkin() {
  //Get favourites from AsyncStorage
  const [favourites, setFavourites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const navigation = useNavigation();

  if (!loaded) {
    getFavourites().then((favourites) => {
      setFavourites(favourites);

      //Should put image loading in here

      setLoaded(true);
    });
  }

  const backButton = require('../images/UI/BackButton.png');

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
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
          height: 50
        }}>
        <Image source={backButton} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>
      <SkinCarousel favourites={favourites} />
    </View>
  );
}
