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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
        // backgroundColor: '#fff'
      }}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={1000}
      animationOutTiming={1000}
      isVisible={isOpen}
      onBackdropPress={() => {
        setIsOpen(false);
      }}>
      <Text>{skin?.data?.name}</Text>

      <View style={styles.slide}>
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
        {/* <ImageBackground
          source={TextFrameImage}
          style={{
            //   width: textFrameSize,
            // width: textFrameSize,
            width: '100%',
            alignSelf: 'center',
            height: textFrameSize,
            //   height: '100%',
            overflow: 'visible'
          }}> */}
        <Text style={styles.title}>{skin?.data?.title}</Text>
        {/* </ImageBackground> */}
      </View>
    </Modal>
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
    fontSize: 40,
    textAlign: 'center',
    marginTop: '10%',
    color: '#FFA500',
    fontFamily: 'Endor'
    // height: '50%'
  }
};
