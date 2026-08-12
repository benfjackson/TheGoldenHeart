import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Sparkle = ({ size, style }) => {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const startedAt = Date.now();
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - startedAt;
      const nextOpacity = Math.max(0, 1 - elapsed / 700);
      setOpacity(nextOpacity);
      if (elapsed >= 700) {
        clearInterval(intervalId);
      }
    }, 32);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={[styles.sparkle, style, { opacity }]}>
      <Svg viewBox="0 0 100 100" width={size} height={size}>
        <Path
          d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z"
          fill="#FFA500"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  sparkle: {
    position: 'absolute'
  }
});

export default Sparkle;
