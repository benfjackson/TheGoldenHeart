
import { ImageBackground } from 'react-native';

import Counter from '../components/CrossCounter';

export default function Forest() {

  const img = require('../images/forest.png');
  return (
    <ImageBackground source={img} style={{width: '100%', height: '100%'}}>
      <Counter />
    </ImageBackground>
    
  );
}