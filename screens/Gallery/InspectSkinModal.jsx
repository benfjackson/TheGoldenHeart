import Modal from 'react-native-modal';
import { View, ImageBackground, Text, Dimensions, Image } from 'react-native';
import { getMiniImage } from '../../services/getSkinInfo';

import FrameImage from '../../images/frame2.png';
import TextFrameImage from '../../images/frame2Horizontal.png';

export default function InspectSkinModal({ skin, isOpen, setIsOpen }) {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const artSize = 0.8 * SCREEN_WIDTH;
  const frameSize = 1.1 * artSize;

  const miniImage = getMiniImage(skin?.data?.id);

  const textFrameSize = 0.55 * SCREEN_WIDTH;

  return (
    <Modal
      style={{
        alignItems: 'center',
        justifyContent: 'center'
      }}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={1000}
      animationOutTiming={1000}
      isVisible={isOpen}
      onBackdropPress={() => {
        setIsOpen(false);
      }}>
      <View>
        <ImageBackground
          source={miniImage}
          style={{
            width: artSize,
            height: artSize * 1.5,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center'
          }}>
          <Image
            source={FrameImage}
            style={{ width: frameSize, height: '100%', overflow: 'visible' }}
          />
        </ImageBackground>
        <Text style={styles.title}>{skin?.data?.title}</Text>
      </View>
    </Modal>
  );
}

const styles = {
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: '10%',
    color: '#FFA500',
    fontFamily: 'Endor'
    // height: '50%'
  }
};
