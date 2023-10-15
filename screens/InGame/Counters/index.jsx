import { View } from 'react-native';

import Counter from './Counter';

export default function Counters({ counterControl }) {
  const { counters } = counterControl;
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end'
      }}>
      {counters.map((counter, index) => {
        return (
          <View
            style={{
              height: '100%',
              width: '60%',
              // width: 220,
              marginRight: '-20%'
            }}
            key={counter.counterName + index}>
            <Counter counter={counter} />
          </View>
        );
      })}
    </View>
  );
}
