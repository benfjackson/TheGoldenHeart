import { Button, View, Text, Image, StyleSheet } from 'react-native';

import { loadGameState } from '../../services/appStorage';
import { useState } from 'react';
import PlayButton from '../../components/PlayButton';
import ResumeGame from './ResumeGame';

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
      console.log('received state in main menu:');
      console.log(state);
      setCheckExistingGame(true);
    });
  }

  if (gameState) {
    return (
      <ResumeGame gameState={gameState} onClose={() => setGameState(null)} />
    );
  }

  return (
    <View style={styles.container}>
      <PlayButton />
    </View>
  );
}
