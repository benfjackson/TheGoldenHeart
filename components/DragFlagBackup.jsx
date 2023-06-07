import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, PanResponder } from 'react-native';

export default function Count({ textColour = '#000' }) {
  const [count, setCount] = useState(20);
  const [dragNumber, setDragNumber] = useState(0);
  const [showDragNumber, setShowDragNumber] = useState(false);

  const countBoxRef = useRef(null);
  const [countBoxLeft, setCountBoxLeft] = useState(0);
  const [countBoxRight, setCountBoxRight] = useState(0);
  const [countBoxTop, setCountBoxTop] = useState();
  const [countBoxBottom, setCountBoxBottom] = useState(0);

  const getLayoutInfo = () => {
    countBoxRef.current.measure((width, height, pX, pY) => {
      setCountBoxTop(pY);
      setCountBoxBottom(pY + height);
      setCountBoxLeft(pX);
      setCountBoxRight(pX + width);
    });
  };

  const skullIcon = require('../icons/skullWhite.png');

  useEffect(() => {
    if (showDragNumber == false) {
      setCount((prevCount) =>
        prevCount + dragNumber < 0 ? 0 : prevCount + dragNumber
      );
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
        const touchY = evt.nativeEvent.pageY;

        // const yDistanceToBox = Math.abs(touchY - countBoxTop);
        // yDistanceToBox = touchY - countBoxTop;
        const yDistanceToBox = 100;
        setShowDragNumber(true);
        if (yDistanceToBox > 0) {
          setShowDragNumber(true);
          const dragNumber = -Math.floor(yDistanceToBox / 15);
          setDragNumber(countBoxTop);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        setShowDragNumber(false);
      },
      onPanResponderTerminate: () => {
        setShowDragNumber(false);
      }
    })
  ).current;

  return (
    <View style={styles.container} id="countBox" ref={countBoxRef}>
      <View>
        <View {...panResponder.panHandlers}>
          {count > 0 ? (
            <Text style={styles.text}>{count}</Text>
          ) : (
            <Image
              style={{ width: 200, height: 200 }}
              source={skullIcon}
              onProgress={() => setCount(20)}
            />
          )}
        </View>
        {
          // { opacity: showDragNumber ? 100 : 0 }
          <Text style={[styles.dragNumber]}>
            {dragNumber > 0 ? '+' : ''}
            {dragNumber}
          </Text>
        }
        {/* <Text style={styles.dragNumber}>MY DICK</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 100,
    //white
    color: '#fff',
    //bold
    fontWeight: 'bold'
  },
  dragNumber: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff'
  }
});
