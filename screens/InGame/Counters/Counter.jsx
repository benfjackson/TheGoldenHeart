import { Text, View, Image, ImageBackground, Dimensions } from 'react-native';

import CounterImage from '../../../images/Counter.png';

import Tapper from '../../../components/Tapper';
import { useEffect, useState } from 'react';
import DragAndDrop from './DragAndDrop';

function Label({ counterName }) {
  switch (counterName) {
    case 'Commander damage':
      return <></>;

    default:
      return (
        <Text
          style={{
            position: 'absolute',
            top: '40%',
            left: '20%',
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#FFA500',
            fontFamily: 'Endor'
          }}>
          {counterName}
        </Text>
      );
  }
}

export default function Counter({ counter }) {
  const { count, counterName, setCount } = counter;

  const windowWidth = Dimensions.get('window').width;
  const size = windowWidth * 0.4;

  return (
    <DragAndDrop>
      <ImageBackground
        style={{
          height: size,
          width: size,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        source={CounterImage}>
        <Label counterName={counterName} />
        <Tapper
          skull={false}
          inverse={false}
          life={count}
          setLife={setCount}
          size="counter"
        />
      </ImageBackground>
    </DragAndDrop>
  );
}
