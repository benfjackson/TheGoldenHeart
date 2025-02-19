import { Button, View, Text, Image, StyleSheet } from 'react-native';

import PlayButton from '../../components/PlayButton';

export default function HomeScreen() {
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

  return (
    <View style={styles.container}>
      <PlayButton />
    </View>
  );
}
