import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Sparkle = ({ size, style }) => {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.sparkle, style, { opacity }]}>
      <Svg viewBox="0 0 100 100" width={size} height={size}>
        <Path
          d="M50 0L61.8 38.2L100 50L61.8 61.8L50 100L38.2 61.8L0 50L38.2 38.2L50 0Z"
          fill="#FFA500"
        />
      </Svg>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sparkle: {
    position: 'absolute'
  }
});

export default Sparkle;
