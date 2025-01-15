import { Button, View, Text, Image, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { loadGameState } from '../../services/appStorage';
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

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        const state = await loadGameState();
        setGameState(state);
        // console.log('Received state in main menu:', state);
      } catch (error) {
        // console.error('Failed to load game state:', error);
      } finally {
        setCheckExistingGame(true);
      }
    };

    if (!checkExistingGame) {
      fetchGameState();
    }
  }, [checkExistingGame]);

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
