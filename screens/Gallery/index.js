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
import { colors } from '../../styles';
import { useEffect } from 'react';
import BackButton from '../../components/BackButton';

export default function Gallery({ route }) {
  return (
    <View style={{ flex: 1 }}>
      <ScreenFrame>
        <BackButton />
        <Text style={{ color: colors.gold }}>Gallery</Text>
      </ScreenFrame>
    </View>
  );
}
