import { set } from 'react-native-reanimated';
import SkinCarousel from './SkinCarousel';

import { getFavourites, addToFavourites } from '../services/appStorage';

import { useState } from 'react';

export default function SelectSkin() {
  //Get favourites from AsyncStorage

  const [favourites, setFavourites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    getFavourites().then((favourites) => {
      setFavourites(favourites);
      setLoaded(true);
    });
  }

  return <SkinCarousel favourites={favourites} />;
}
