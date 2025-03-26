import { useNavigation } from '@react-navigation/native';

import { Text, View, Pressable, StyleSheet } from 'react-native';

import { clearGameState } from '../../../services/appStorage';
import { fonts } from '../../../styles';

export default function Main({ setMenuState, setPopupMenuIsOpen, resetGame }) {
  const styles = StyleSheet.create({
    button: {
      color: 'rgb(250, 180, 40)',
      fontSize: 35,
      textAlign: 'center',
      fontFamily: fonts.readableText
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
          setPopupMenuIsOpen(false);
          clearGameState();
          navigation.navigate('HomeScreen');
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
