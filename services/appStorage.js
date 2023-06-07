import AsyncStorage from '@react-native-async-storage/async-storage';

// Storing a token
export async function storeToken(token, tokenName) {
  try {
    await AsyncStorage.setItem(tokenName, token);
    return 'success';
  } catch (error) {
    return `error: ${error}`;
  }
}

// Retrieving a token
export async function retrieveToken(tokenName) {
  try {
    const token = await AsyncStorage.getItem(tokenName);
    if (token !== null) {
      return token;
    } else {
      return 'not found';
    }
  } catch (error) {
    return `error: ${error}`;
  }
}

// Removing a token
export async function removeToken(tokenName) {
  try {
    await AsyncStorage.removeItem(tokenName);
    return 'success';
  } catch (error) {
    return `error: ${error}`;
  }
}

export async function getFavourites() {
  try {
    const favourites = await AsyncStorage.getItem('favourites');
    if (favourites !== null) {
      //convert from string to array
      const favouritesArray = JSON.parse(favourites);
      return favouritesArray;
    } else {
      //initialise favourites
      const initialFavourites = [
        'Angel',
        'Devil',
        'Druid',
        'Kraken',
        'NobleVampire',
        'LightningDragon'
      ];
      await AsyncStorage.setItem(
        'favourites',
        JSON.stringify(initialFavourites)
      );
      return initialFavourites;
    }
  } catch (error) {
    return `error: ${error}`;
  }
}
export async function addToFavourites(skinName) {
  try {
    const favourites = await AsyncStorage.getItem('favourites');
    if (favourites !== null) {
      const favouritesArray = JSON.parse(favourites);
      favouritesArray.push(skinName);
      await AsyncStorage.setItem('favourites', JSON.stringify(favouritesArray));
      return 'success';
    } else {
      await AsyncStorage.setItem('favourites', JSON.stringify([skinName]));
      return 'success';
    }
  } catch (error) {
    return `error: ${error}`;
  }
}
export async function removeFromFavourites(skinName) {
  try {
    const favourites = await AsyncStorage.getItem('favourites');
    if (favourites !== null) {
      const favouritesArray = JSON.parse(favourites);
      const newFavouritesArray = favouritesArray.filter(
        (favourite) => favourite !== skinName
      );
      await AsyncStorage.setItem(
        'favourites',
        JSON.stringify(newFavouritesArray)
      );
      return 'success';
    } else {
      return 'not found';
    }
  } catch (error) {
    return `error: ${error}`;
  }
}
