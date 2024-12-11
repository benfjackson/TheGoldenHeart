import { View } from 'react-native';

import Counter from './Counter';

export default function Counters({ counterControl }) {
  const { counters } = counterControl;
  return (
    // <View
    //   style={{
    //     flex: 1,
    //     width: '100%',
    //     height: '100%',
    //     backgroundColor: 'white'
    //     // alignItems: 'center',
    //     // flexDirection: 'row',
    //     // justifyContent: 'flex-end'
    //   }}>
    <View
      style={{
        backgroundColor: 'white',
        width: '0%',
        position: 'absolute',
        bottom: 0
      }}>
      {counters.map((counter, index) => {
        return (
          // <View
          //   style={{
          //     height: '10%',
          //     width: '60%',
          //     // width: 220,
          //     marginRight: '-20%'
          //   }}
          //   key={counter.counterName + index}>
          <Counter key={index} counter={counter} />
          // </View>
        );
      })}
    </View>
    // </View>
  );
}
