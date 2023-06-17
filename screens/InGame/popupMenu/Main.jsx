import { useNavigation } from '@react-navigation/native';

import { Text, View, Pressable, StyleSheet } from 'react-native';

export default function Main({ setMenuState, gameState, setIsOpen }) {
  const styles = StyleSheet.create({
    button: {
      // color: 'rgb(243, 130, 26)',
      color: 'rgb(250, 180, 40)',
      fontSize: 25,
      textAlign: 'center',
      fontFamily: 'Endor'
    }
  });

  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
      }}>
      <Pressable
        onPress={() => {
          setIsOpen(false);
          navigation.navigate('MainMenu');
        }}>
        <Text style={styles.button}>Home</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          gameState.setGuest(!gameState.guest);
          setIsOpen(false);
        }}>
        <Text style={styles.button}>
          {gameState.guest ? 'Remove guest' : 'Add guest'}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          gameState.setLife(20);
          gameState.setHistory([]);
          gameState.setGuestLife(20);
          setIsOpen(false);
        }}>
        <Text style={styles.button}>Reset</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setMenuState('history');
        }}>
        <Text style={styles.button}>Life History</Text>
      </Pressable>
    </View>
  );
}
