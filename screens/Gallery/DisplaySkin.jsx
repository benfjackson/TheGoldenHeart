import { getMiniImage } from '../../services/getSkinInfo';

import {
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  Text
} from 'react-native';

import FrameImage from '../../images/FRAME_TRANSPARENT.png';

export default function DisplaySkin({ skin, onPress }) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const artSize = 0.6 * SCREEN_WIDTH;
  const frameSize = 1.5 * artSize;

  const miniImage = getMiniImage(skin?.data?.id);

  return (
    <View style={styles.slide}>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground
          source={miniImage}
          style={{
            width: artSize,
            height: artSize,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
          }}>
          <Image
            source={FrameImage}
            style={{ width: frameSize, height: frameSize }}
          />
        </ImageBackground>
        {/* <Text style={styles.title}>{skin.title}</Text> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  slide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: '10%',
    color: '#FFA500',
    fontFamily: 'Endor',
    height: '50%'
  }
};
