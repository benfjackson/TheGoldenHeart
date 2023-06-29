import { Button, View, Text, Image, StyleSheet } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { loadGameState, clearGameState } from '../services/appStorage';
import { useState } from 'react';

export default function MainMenu() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: 'black'
    },
    button: {
      color: '#FFA500',
      fontSize: 35,
      textAlign: 'center',
      fontFamily: 'Endor'
    },
    title: {
      color: '#FFA500',
      fontSize: 50,
      textAlign: 'center',
      fontFamily: 'Endor'
    }
  });

  const [checkExistingGame, setCheckExistingGame] = useState(false);
  const [gameState, setGameState] = useState(null);
  if (!checkExistingGame) {
    loadGameState().then((state) => {
      setGameState(state);
      setCheckExistingGame(true);
    });
  }
  const navigation = useNavigation();

  if (gameState !== null && gameState !== undefined && gameState?.life) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Continue Game at {gameState.life} health?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('InGame', {
              gameState: gameState,
              skinID: gameState.skinID
            });
          }}>
          <Text style={styles.button}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            clearGameState();
            setGameState(null);
          }}>
          <Text style={styles.button}>No</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //If there is a saved game, show continue button
  // if (savedGame !== null) return;

  //image to use as button
  const playButton = require('../images/UI/PlayButton.png');
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('SelectSkin')}>
        <Image source={playButton} style={{ width: 300, height: 200 }} />
      </TouchableOpacity>
    </View>
  );
}
