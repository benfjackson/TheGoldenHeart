import { useNavigation } from '@react-navigation/native';

import { Text, View, Pressable, StyleSheet, Image } from 'react-native';

export default function Game({ setMenuState }) {
  // const { guest, setGuest, setLife, setHistory, setGuestLife } = gameState;

  const styles = StyleSheet.create({
    button: {
      color: 'rgb(250, 180, 40)',
      fontSize: 35,
      textAlign: 'center',
      fontFamily: 'Endor'
    }
  });

  const backButton = require('../../../images/BackArrow1.png');
  return (
    <View
      style={{
        flex: 1,
        width: '100%'
      }}>
      <Pressable
        onPress={() => {
          setMenuState('main');
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10
        }}>
        <Image source={backButton} style={{ width: 50, height: 35 }} />
      </Pressable>
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
            setMenuState('counters');
          }}>
          <Text style={styles.button}>Counters</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setMenuState('history');
          }}>
          <Text style={styles.button}>Life History</Text>
        </Pressable>
      </View>
    </View>
  );
}
