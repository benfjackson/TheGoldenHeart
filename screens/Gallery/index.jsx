import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  Dimensions
} from 'react-native';

import ScreenFrame from '../../components/ScreenFrame';
import { colors } from '../../styles';

import BackButton from '../../components/BackButton';
import RequiresAccount from '../RequiresAccount';

export default function Gallery({ route }) {
  return (
    <RequiresAccount>
      <View style={{ flex: 1 }}>
        <ScreenFrame>
          <BackButton />
          <Text style={{ color: colors.gold }}>Gallery</Text>
        </ScreenFrame>
      </View>
    </RequiresAccount>
  );
}
