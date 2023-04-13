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
    if (Math.abs(dy) > 100) {
      swipeValue = bigSwipeValue;
    }

    if (dy < swipeUpThreshold) {
      setNumber(prevNumber => prevNumber + swipeValue);
    } else if (dy > swipeDownThreshold) {
      setNumber(prevNumber => prevNumber - swipeValue);
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
