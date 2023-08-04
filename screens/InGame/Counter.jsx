import { Text, View, Image, ImageBackground } from 'react-native';

import CounterImage from '../../images/UI/Counter.png';

import Tapper from '../../components/Tapper';
import { useEffect, useState } from 'react';
import { saveCounter } from '../../services/appStorage';

export default function Counter({ counter, reset }) {
  // const count = counters.find((c) => (c.name = counter.name));

  console.log('counter in object', counter);

  const [count, setCount] = useState(
    counter.savedCount || counter.initialCount
  );
  useEffect(() => {
    console.log("resetting counter's count", reset);
    setCount(counter.initialCount);
  }, [reset]);
  useEffect(() => {
    const newCounter = { ...counter, savedCount: count };
    console.log('saving counter', newCounter);
    saveCounter(newCounter);
  }, [count]);
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
        {counter.name}
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
