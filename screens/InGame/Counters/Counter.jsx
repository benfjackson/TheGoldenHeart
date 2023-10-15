import { Text, View, Image, ImageBackground } from 'react-native';

import CounterImage from '../../../images/Counter.png';

import Tapper from '../../../components/Tapper';
import { useEffect, useState } from 'react';
import { saveCounter } from '../../../services/appStorage';

export default function Counter({ counter }) {
  const { count, counterName, setCount } = counter;

  return (
    <ImageBackground
      style={{
        height: '100%',
        // width: 250, //'100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      source={CounterImage}>
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
      <Tapper
        skull={false}
        inverse={false}
        life={count}
        setLife={setCount}
        size="counter"
      />
    </ImageBackground>
  );
}
