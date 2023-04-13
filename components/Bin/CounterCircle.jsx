import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';
import {Dimensions} from 'react-native';

export default function MyComponent() {
  const [number, setNumber] = useState(20);
  const [deltaNumber, setDeltaNumber] = useState(0);

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

  const onCircularSwipe = (evt, gestureState) => {
    const { moveX, moveY, dx, dy } = gestureState;

    //const [centerX, centerY] = [0, 0]; // Change to adjust center of the circle
    //Centre of the current view

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height; 

    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;
    const radius = 150; // Change to adjust size of the circle

    const angle = Math.atan2(moveY - centerY, moveX - centerX);
    const degrees = angle * (180 / Math.PI);
    const value = Math.round(degrees / 10);
    setDeltaNumber(value);
  };

  const onRelease = () => {
    setNumber(prevNumber => prevNumber + deltaNumber);
    setDeltaNumber(0);
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: onCircularSwipe,
    onPanResponderRelease: onRelease,
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Text style={styles.number}>{number}</Text>
        <Text style={[styles.number, { fontSize: 24 }, deltaNumber === 0 ? {opacity: 0} : {}]}>
          {deltaNumber > 0 ? '+' : '-'}{Math.abs(deltaNumber)}
        </Text>
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
  }
});
