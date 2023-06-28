import { Text, View, Image, ImageBackground } from 'react-native';

import Counter from './Counter';

export default function Counters({
  setMenuState,
  counters,
  setCounters,
  reset
}) {
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
      {counters.map((counter) => {
        return (
          <View
            style={{
              height: '100%',
              width: '60%',
              // width: 220,
              marginRight: '-20%'
            }}
            key={counter.name}>
            <Counter counter={counter} reset={reset} />
          </View>
        );
      })}
    </View>
  );
}
