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

////////////////////////////////////
/////////// GAME STATE /////////////
////////////////////////////////////

export async function saveGameState(gameState) {
  try {
    const timestamp = new Date();
    const stampedState = { timestamp: timestamp, ...gameState };
    await AsyncStorage.setItem('gameState', JSON.stringify(stampedState));
    return 'success';
  } catch (error) {
    return `error: ${error}`;
  }
}

export async function loadGameState() {
  try {
    const loadedState = await AsyncStorage.getItem('gameState');
    if (loadedState !== null) {
      console.log('game state found');
      console.log(loadedState);
      const gameState = JSON.parse(loadedState);
      const timestamp = new Date(gameState.timestamp);
      const now = new Date();
      // Calculate the difference in milliseconds between the current date and the date to check
      var differenceInMilliseconds = now.getTime() - timestamp.getTime();

      // Convert milliseconds to days
      var differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

      if (differenceInDays > 1) {
        return null;
      }
      return gameState;
    } else {
      return null;
    }
  } catch (error) {
    return `error: ${error}`;
  }
}

export async function clearGameState() {
  try {
    await AsyncStorage.removeItem('gameState');
    return 'success';
  } catch (error) {
    return `error: ${error}`;
  }
}

//////////////////////////////////
/////////// TUTORIAL /////////////
//////////////////////////////////

export async function checkHasCompletedTutorial() {
  try {
    const token = await AsyncStorage.getItem('completedTutorial');
    if (token !== null) {
      return token === 'true';
    } else {
      return false;
    }
  } catch (error) {
    return `error: ${error}`;
  }
}

// Is JSONification needed?
export async function completeTutorial() {
  try {
    await AsyncStorage.setItem('completedTutorial', 'true');
    return 'success';
  } catch (error) {
    return `error: ${error}`;
  }
}

////////////////////////////////////
/////////// FAVOURITES /////////////
////////////////////////////////////

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
        'NobleVampire'
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
