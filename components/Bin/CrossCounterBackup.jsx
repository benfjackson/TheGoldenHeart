import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

const CountTracker = () => {
  const [count, setCount] = useState(20);
  const [longPressNumber, setLongPressNumber] = useState(0);
  const [showLongPressNumber, setShowLongPressNumber] = useState(false);



  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setShowLongPressNumber(false);
      },
      onPanResponderMove: (evt, gestureState) => {
        
        if (Math.abs(gestureState.dy) > 50) {
          setShowLongPressNumber(true);
          const longPressNumber = Math.floor(gestureState.dy / 50);
          setLongPressNumber(longPressNumber);
        } else {
          setShowLongPressNumber(false);
          setLongPressNumber(0);
        }

      },
      onPanResponderRelease: (evt, gestureState) => {
        setShowLongPressNumber(false);
        if (Math.abs(longPressNumber) > 0) {
          setCount(prevCount => prevCount + longPressNumber);
        } else if (gestureState.dx > 50) {
          setCount(prevCount => prevCount + 1);          
        } else if (gestureState.dx < -50) {
          setCount(prevCount => prevCount - 1);
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
