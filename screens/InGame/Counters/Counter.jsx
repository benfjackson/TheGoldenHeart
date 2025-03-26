import {
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  StyleSheet
} from 'react-native';

import CounterImage from '../../../images/Counter.png';

import Tapper from '../../../components/Tapper';
import { useEffect, useState } from 'react';
import DragAndDrop from './DragAndDrop';

function Label({ counterName }) {
  switch (counterName) {
    case 'Commander damage':
      return <Text style={styles.labelText}>Commander</Text>;

    default:
      return <Text style={styles.labelText}>{counterName}</Text>;
  }
}

export default function Counter({ counter }) {
  const { count, counterName, setCount } = counter;

  const windowWidth = Dimensions.get('window').width;
  const size = windowWidth * 0.4;

  return (
    <DragAndDrop updateLife={(toAdd) => setCount(count + toAdd)}>
      <ImageBackground
        style={{
          height: size,
          width: size,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        source={CounterImage}>
        <Label counterName={counterName} />
        <Tapper skull={false} inverse={false} life={count} setLife={setCount} />
      </ImageBackground>
    </DragAndDrop>
  );
}

const styles = StyleSheet.create({
  labelText: {
    position: 'absolute',
    top: '40%',
    left: '20%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFA500',
    fontFamily: 'Endor'
  }
});
