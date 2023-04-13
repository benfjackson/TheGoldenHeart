
import { ImageBackground } from 'react-native';

import Counter from '../components/CrossCounter';

export default function Mountain() {

    const img = require('../images/upscaled/mountain.png');
  return (
    <ImageBackground source={img} style={{width: '100%', height: '100%'}}>
      <Counter />
    </ImageBackground>
    
  );
}