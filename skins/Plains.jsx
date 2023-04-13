
import { ImageBackground } from 'react-native';

import Counter from '../components/CrossCounter';

export default function Plains() {

    const img = require('../images/plains.png');
  return (
    <ImageBackground source={img} style={{width: '100%', height: '100%'}}>
      <Counter />
    </ImageBackground>
    
  );
}