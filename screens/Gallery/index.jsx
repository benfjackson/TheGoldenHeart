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
import GoldShards from './GoldShards';

export default function Gallery({ route }) {
  return (
    <RequiresAccount>
      <View style={{ flex: 1 }}>
        <ScreenFrame>
          <View
            style={{
              // Sit at top
              position: 'absolute',
              top: '8%',

              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              // height: '10%',
              width: '80%'
            }}>
            <BackButton />
            <GoldShards />
          </View>
          <Text style={{ color: colors.gold }}>Gallery</Text>
        </ScreenFrame>
      </View>
    </RequiresAccount>
  );
}
