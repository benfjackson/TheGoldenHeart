import { memo } from 'react';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { Circle } from 'react-native-svg';

import { getOrbCenter } from './holographicMath';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function HolographicOrb({ orb, tilt }) {
  const animatedProps = useAnimatedProps(() => {
    return getOrbCenter(tilt.x.value, tilt.y.value, orb);
  });

  return (
    <AnimatedCircle animatedProps={animatedProps} fill={`url(#${orb.id})`} />
  );
}

export default memo(HolographicOrb);
