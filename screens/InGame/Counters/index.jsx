import { View } from 'react-native';

import Counter from './Counter';

export default function Counters({ counterControl }) {
  const { counters } = counterControl;
  return (
    <View
      style={{
        width: '0%',
        position: 'absolute',
        bottom: 0
      }}>
      {counters.map((counter, index) => {
        return <Counter key={index} counter={counter} />;
      })}
    </View>
  );
}
