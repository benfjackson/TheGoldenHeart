import { View, Image, TouchableOpacity } from 'react-native';
import BackButtonImage from '../images/BackArrow1.png';

import { useNavigation } from '@react-navigation/native';
export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HomeScreen');
      }}
      style={{
        backgroundColor: '#000',
        position: 'absolute',
        top: '10%',
        left: '2%',
        width: '12%',
        zIndex: 10
      }}>
      <Image source={BackButtonImage} style={{ width: '100%', height: 35 }} />
    </TouchableOpacity>
  );
}
