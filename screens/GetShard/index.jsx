import { View } from 'react-native';
import ScreenFrame from '../../components/ScreenFrame';
import BackButton from '../../components/BackButton';

export default function GetShard() {
  return (
    <ScreenFrame>
      <BackButton />
      <View style={{ flex: 1 }}></View>
    </ScreenFrame>
  );
}
