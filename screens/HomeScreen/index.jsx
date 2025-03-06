import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native';

import PlayButton from '../../components/PlayButton';
import ScreenFrame from '../../components/ScreenFrame';

export default function HomeScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // width: '100%',
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
  // const { width, height } = Dimensions.get('window');
  // const screenRatio = width / height;

  return (
    <View style={styles.container}>
      <ScreenFrame>
        <PlayButton />
      </ScreenFrame>
    </View>
  );
}
