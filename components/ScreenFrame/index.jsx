import { ImageBackground } from 'react-native';

import frame1 from '../../images/frame1.png';
import frame2 from '../../images/frame2.png';
import frame3 from '../../images/frame3.png';
import frame4 from '../../images/frame4.png';

export default function ScreenFrame({ children, frameStyle = '4' }) {
  const styleMap = { 1: frame1, 2: frame2, 3: frame3, 4: frame4 };

  const frame = styleMap[frameStyle];

  return (
    <ImageBackground
      resizeMode="stretch"
      style={{
        flex: 1,
        // width: windowWidth,
        // height: windowHeight,
        width: '102%',
        marginLeft: '-3%', // 10% of 110
        alignSelf: 'center',
        // height: undefined,
        // aspectRatio: screenRatio,
        alignItems: 'center',
        justifyContent: 'center'
      }}
      source={frame}>
      {children}
    </ImageBackground>
  );
}
