import { Text, View, Image, ImageBackground } from 'react-native';

import CounterImage from '../../images/UI/Counter.png';

import Tapper from '../../components/Tapper';
import { useEffect, useState } from 'react';

export default function Counters({ counter, reset }) {
  // const count = counters.find((c) => (c.name = counter.name));

  const [count, setCount] = useState(counter.initialCount);
  useEffect(() => {
    setCount(counter.initialCount);
  }, [reset]);
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
      {/* <Counter
                counter={counter}
                counters={counters}
                setCounters={setCounters}
              /> */}

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
