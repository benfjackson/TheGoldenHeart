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
import BasicButton from '../../components/BasicButton';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // width: '100%',
      backgroundColor: 'black'
    }
  });
  // const { width, height } = Dimensions.get('window');
  // const screenRatio = width / height;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScreenFrame>
        <PlayButton />
        {/* <BasicButton
          onPress={() => navigation.navigate('Gallery')}
          text={'Gallery'}
        /> */}
      </ScreenFrame>
    </View>
  );
}
