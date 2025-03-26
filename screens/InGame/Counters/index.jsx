import { View } from 'react-native';

import Counter from './DraggableTapper';

export default function Counters({ counterControl }) {
  const { counters } = counterControl;
  return (
    <View
      style={{
        width: '0%',
        position: 'absolute',
        bottom: 0
      }}>
      {counters.map((counter) => {
        return <Counter key={counter.id} counter={counter} />;
      })}
    </View>
  );
}
