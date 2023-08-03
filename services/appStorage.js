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

export async function saveGameState(gameState) {
  try {
    await AsyncStorage.setItem('gameState', JSON.stringify(gameState));
    return 'success';
  } catch (error) {
    return `error: ${error}`;
  }
}

export async function saveCounter(counter) {
  console.log('saving counter', counter);
  try {
    AsyncStorage.getItem('gameState').then((gameState) => {
      // console.log('game state', gameState);
      //convert gameState to object
      const gameStateObject = JSON.parse(gameState);

      //set the counter in gameState.activeCounters with matching counter.name to counter
      //save gameState
      const newActiveCounters = gameStateObject?.activeCounters?.map((c) => {
        if (c.name === counter.name) {
          return counter;
        } else {
          return c;
        }
      });
      // console.log('newActiveCounters', newActiveCounters);
      const newGameState = {
        ...gameStateObject,
        activeCounters: newActiveCounters
      };
      // console.log('newGameState');
      // console.log(newGameState);
      AsyncStorage.setItem('gameState', JSON.stringify(newGameState));
      return 'success';
    });
  } catch (error) {
    console.log('errord');
    return `error: ${error}`;
  }
}

export async function loadGameState() {
  try {
    const gameState = await AsyncStorage.getItem('gameState');
    if (gameState !== null) {
      console.log('game state found');
      console.log(gameState);
      return JSON.parse(gameState);
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
