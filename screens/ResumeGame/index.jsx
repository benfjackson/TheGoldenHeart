import { useNavigation } from '@react-navigation/native';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { clearGameState, loadGameState } from '../../services/appStorage';

import { useEffect, useState } from 'react';

export default function ResumeGame({}) {
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

  const navigation = useNavigation();

  const [gameState, setGameState] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedGameState = await loadGameState();

        if (loadedGameState) {
          setGameState(loadedGameState);
        }
      } catch (error) {
        console.error('Error loading app state:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continue saved game?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('InGame', {
            loadGameState: gameState
          });
        }}>
        <Text style={styles.button}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          clearGameState();
          navigation.navigate('HomeScreen');
        }}>
        <Text style={styles.button}>No</Text>
      </TouchableOpacity>
    </View>
  );
}
