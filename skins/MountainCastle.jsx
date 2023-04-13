
import { ImageBackground } from 'react-native';

import Counter from '../components/CrossCounter';

export default function MountainCastle() {

    const img = require('../images/upscaled/mountainCastle.png');
  return (
    <ImageBackground source={img} style={{width: '100%', height: '100%'}}>
      <Counter textColour='black'/>
    </ImageBackground>
    
  );
}