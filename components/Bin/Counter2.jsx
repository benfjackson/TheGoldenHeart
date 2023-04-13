import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

export default function Counter() {
  const [number, setNumber] = useState(20);

  const onVerticalSwipe = (evt, gestureState) => {
    const { dy } = gestureState;
    const swipeUpThreshold = -50;
    const swipeDownThreshold = 50;
    const smallSwipeValue = 1;
    const bigSwipeValue = 2;

    let swipeValue = smallSwipeValue;
    if (Math.abs(dy) > 150) {
      swipeValue = bigSwipeValue;
    }

    if (dy < swipeUpThreshold) {
      const savedNumber = number;
      const skippedNumber = number + 1;
      setNumber(skippedNumber);
      setTimeout(() => setNumber(savedNumber + swipeValue), 100);
    } else if (dy > swipeDownThreshold) {
      const savedNumber = number;
      const skippedNumber = number - 1;
      setNumber(skippedNumber);
      setTimeout(() => setNumber(savedNumber - swipeValue), 100);
    }
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: onVerticalSwipe,
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.number}>{number}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 64,
    fontWeight: 'bold',
  },
});
