import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, PanResponder } from 'react-native';



export default function Count ({textColour='#fff'}){
  const [count, setCount] = useState(20);
  const [dragNumber, setDragNumber] = useState(0);
  const [showDragNumber, setShowDragNumber] = useState(false);

  const skullIcon = require('../icons/skull-white.png');

  useEffect(() => {
    if (showDragNumber == false) {
      setCount(prevCount => prevCount + dragNumber);
      setDragNumber(0);
    }
  }, [showDragNumber]);

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setShowDragNumber(false);
      },
      onPanResponderMove: (evt, gestureState) => {
        
        const dy = Math.abs(gestureState.dy)
        const dx = Math.abs(gestureState.dx)
        if (dy > 0 && dy > dx) {
          setShowDragNumber(true);
          const dragNumber = -Math.floor(gestureState.dy / 20);
          setDragNumber(dragNumber);
        } 

      },
      onPanResponderRelease: (evt, gestureState) => {
        setShowDragNumber(false);

        const dy = Math.abs(gestureState.dy)
        // const dx = Math.abs(gestureState.dx)
        if (dy < 50) {
          // if (gestureState.dx > 150) {
          //   setCount(prevCount => prevCount + 2);
          // } else
           if (gestureState.dx > 50) {
            setCount(prevCount => prevCount + 1);
          // } else if (gestureState.dx < -150) {
          //   setCount(prevCount => prevCount - 2);
          } else if (gestureState.dx < -50) {
            setCount(prevCount => prevCount - 1);
          }
        }
      },
      onPanResponderTerminate: () => {
        setShowDragNumber(false);
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View {...panResponder.panHandlers}>
        {
        count > 0 ? <Text style={styles.text}>{count}</Text> : 

        //Same size as text
        <Image style={{width: 100, height: 100}} source={skullIcon} />
        // <Image source={skullIcon} />
        
        }
      </View>
      <Text style={[{opacity: 0}]}> HI LIVI!!!</Text>
      {
        <Text style={[styles.dragNumber, {opacity: showDragNumber ? 100 : 0}]}>
          {dragNumber > 0 ? '+' : ''}
          {dragNumber}
        </Text>
      }
      
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
    fontSize: 100,
    //white
    color: '#fff',
    //bold
    fontWeight: 'bold',

  },
  dragNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
});
