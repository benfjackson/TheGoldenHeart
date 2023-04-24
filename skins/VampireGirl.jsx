
import { ImageBackground } from 'react-native';

import Counter from '../components/CrossCounter';

export default function VampireGirl() {

    const img = require('../images/upscaled/vampGirl1-transformed.png');
  return (
    <ImageBackground source={img} style={{width: '100%', height: '100%'}}>
      <Counter />
    </ImageBackground>
    
  );
}