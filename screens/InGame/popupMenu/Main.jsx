import { useNavigation } from '@react-navigation/native';

import { Text, View, Pressable, StyleSheet } from 'react-native';

import { clearGameState } from '../../../services/appStorage';

export default function Main({ setMenuState, setPopupMenuIsOpen, resetGame }) {
  // const { guest, setGuest, setLife, setHistory, setGuestLife } = gameState;

  const styles = StyleSheet.create({
    button: {
      // color: 'rgb(243, 130, 26)',
      color: 'rgb(250, 180, 40)',
      fontSize: 35,
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
        onPress={async () => {
          setPopupMenuIsOpen(false);
          clearGameState().then(() => navigation.navigate('MainMenu'));
          // console.log('clearresult', clearResult);
        }}>
        <Text style={styles.button}>Home</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          resetGame();
          setPopupMenuIsOpen(false);
        }}>
        <Text style={styles.button}>Reset</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setMenuState('counters');
        }}>
        <Text style={styles.button}>Counters</Text>
      </Pressable>
    </View>
  );
}
