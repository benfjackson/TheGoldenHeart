import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

export default function MyComponent() {
  const [number, setNumber] = useState(20);
  const [longPressActive, setLongPressActive] = useState(false);
  const [longPressNumber, setLongPressNumber] = useState(0);

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
      const skippedNumber = number + swipeValue;
      setNumber(skippedNumber);
      setTimeout(() => setNumber(prevNumber => prevNumber + swipeValue), 200);
    } else if (dy > swipeDownThreshold) {
      const skippedNumber = number - swipeValue;
      setNumber(skippedNumber);
      setTimeout(() => setNumber(prevNumber => prevNumber - swipeValue), 200);
    }
  };

  const onLongPress = () => {
    setLongPressActive(true);
    setLongPressNumber(0);
  };

  const onLongPressMove = (evt, gestureState) => {
    const { dy } = gestureState;
    const longPressThreshold = 50;
    const maxLongPressValue = 10;

    const longPressValue = Math.round(dy / longPressThreshold) * maxLongPressValue;
    setLongPressNumber(longPressValue);
  };

  const onLongPressRelease = () => {
    setLongPressActive(false);
    setNumber(prevNumber => prevNumber + longPressNumber);
    setLongPressNumber(0);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: longPressActive ? onLongPressMove : onVerticalSwipe,
    onPanResponderRelease: onLongPressRelease
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.number}>Number{number}</Text>

            <Text style={[styles.longPressNumber, longPressNumber ? {} : {}]}>LongPressNumber{longPressNumber}</Text>

            <Text> Longpress: {longPressActive ? "yes" : "no"}</Text>
    </View>



  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  countText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  slider: {
    backgroundColor: 'gray',
    height: 200,
    width: 50,
    borderRadius: 10,
  },
  sliderCount: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});
