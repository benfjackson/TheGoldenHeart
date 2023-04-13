import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

const CountTracker = () => {
  const [count, setCount] = useState(20);
  const [longPressNumber, setLongPressNumber] = useState(0);
  const [showLongPressNumber, setShowLongPressNumber] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [pressTime, setPressTime] = useState(null)
  const [pressDuration, setPressDuration] = useState(0)
  // const [pressReleaseDuration, setPressReleaseDuration] = useState(0)

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setShowLongPressNumber(false);
        setStartTime(Date.now());
      },
      onPanResponderMove: (evt, gestureState) => {
        // const pressDuration = Date.now() - startTime;
        setPressTime(Date.now());
        
        if (diffTime >= 500) {
          setShowLongPressNumber(true);
          const longPressNumber = Math.floor(gestureState.dy / 10);
          setLongPressNumber(longPressNumber);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        setShowLongPressNumber(false);
        const diffTime = pressTime ? pressTime - startTime : 0;
        setPressDuration(diffTime);

        const shortFlickThreshold = 2000; // milliseconds
        if (pressDuration < shortFlickThreshold) {
          setCount(prevCount => prevCount + 1);
        } else {
          setCount(prevCount => prevCount + longPressNumber);
        }
        setLongPressNumber(0);
      },
      onPanResponderTerminate: () => {
        setShowLongPressNumber(false);
        setCount(prevCount => prevCount + longPressNumber);
        setLongPressNumber(0);
      },
    })
  ).current;

  const diffTime = pressTime ? pressTime - startTime : 0;

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers}>
        <Text style={styles.text}>{count}</Text>
      </View>
      <Text>HI LIVI!</Text>
      {showLongPressNumber && (
        <Text style={styles.longPressNumber}>
          {longPressNumber > 0 ? '+' : ''}
          {longPressNumber}
        </Text>
      )}
      <Text>Start time: {startTime} </Text>
      <Text>Press time: {pressTime}</Text>
      <Text>Press duration: {pressDuration}</Text>
      <Text>diffTime: {diffTime}</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 50,
  },
  longPressNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default CountTracker;
