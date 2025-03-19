import { View, Image, TouchableOpacity } from 'react-native';
import BackButtonImage from '../images/BackArrow1.png';

//parent may need zIndex 10
import { useNavigation } from '@react-navigation/native';
import { style } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ width: 50, zIndex: 10 }}
      onPress={() => {
        navigation.navigate('HomeScreen');
      }}>
      <Image source={BackButtonImage} style={{ width: '100%', height: 35 }} />
    </TouchableOpacity>
  );
}
