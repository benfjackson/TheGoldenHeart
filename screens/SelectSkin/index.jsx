import SkinCarousel from './SkinCarousel';
import StartingHealthPicker from './StartingHealthPicker';
import NumPlayersPicker from './NumPlayersPicker';

import { getFavourites, addToFavourites } from '../../services/appStorage';

import { useNavigation } from '@react-navigation/native';

import { useState, useEffect } from 'react';

import { View } from 'react-native';
import BackButton from '../../components/BackButton';

export default function SelectSkin() {
  //Get favourites from AsyncStorage
  const [favourites, setFavourites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [startingHealth, setStartingHealth] = useState(20);
  const [numPlayers, setNumPlayers] = useState(1);

  const navigation = useNavigation();

  useEffect(() => {
    getFavourites().then((favourites) => {
      // setFavourites(favourites);
      setFavourites([
        'Island',
        'Mountain',
        'Plains',
        'Swamp',
        'Forest',
        'HopeVDespair',
        'Waves',
        'Quadrants',
        'Serenity',
        'ThreeRings'
      ]);

      //Should put image loading in here

      setLoaded(true);
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',

        backgroundColor: '#000'
      }}>
      <View
        style={{
          position: 'absolute',
          top: '10%',
          left: '2%',
          zIndex: 10
        }}>
        <BackButton />
      </View>

      <View
        style={{
          flex: 1,
          width: '100%',
          paddingTop: '20%'
        }}>
        <View style={{ flex: 1, width: '100%' }}>
          <SkinCarousel
            startingHealth={startingHealth}
            favourites={favourites}
            numPlayers={numPlayers}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 8,
            paddingBottom: 24,
            width: '100%'
          }}>
          <NumPlayersPicker
            numPlayers={numPlayers}
            setNumPlayers={setNumPlayers}
          />
          <StartingHealthPicker
            startingHealth={startingHealth}
            setStartingHealth={setStartingHealth}
          />
        </View>
      </View>
    </View>
  );
}
