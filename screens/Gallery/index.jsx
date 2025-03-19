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
import DisplayCase from './DisplayCase';

export default function Gallery({ route }) {
  return (
    <RequiresAccount>
      <View style={{ flex: 1 }}>
        <ScreenFrame>
          <View
            style={{
              // Sit at top
              // position: 'absolute',
              // top: '8%',

              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '80%'
            }}>
            <BackButton />
            <GoldShards />
          </View>
          <DisplayCase />
        </ScreenFrame>
      </View>
    </RequiresAccount>
  );
}
