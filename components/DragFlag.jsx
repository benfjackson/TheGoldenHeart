import React, { useState, useEffect, useRef, useMemo } from 'react';
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

  const skullIcon = require('../icons/skullWhite.png');

  useEffect(() => {
    if (showDragNumber == false) {
      setCount((prevCount) =>
        prevCount + dragNumber < 0 ? 0 : prevCount + dragNumber
      );
      setDragNumber(0);
    }
  }, [showDragNumber]);

  const tapResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (event) => {
          return (
            event.nativeEvent.pageX < countBoxLeft ||
            event.nativeEvent.pageX > countBoxRight ||
            event.nativeEvent.pageY < countBoxTop ||
            event.nativeEvent.pageY > countBoxBottom
          );
        },
        onPanResponderRelease: (event, gestureState) => {
          const x = event.nativeEvent.pageX;
          const y = event.nativeEvent.pageY;

          const centreOfBox = (countBoxTop + countBoxBottom) / 2;

          setCount((prevCount) =>
            y < centreOfBox ? prevCount + 1 : prevCount - 1
          );
        }
      }),
    [countBoxTop, countBoxBottom, countBoxLeft, countBoxRight]
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (event, gestureState) => {
          // Use the layout values to determine if the gesture should be handled
          // const { dx, dy } = gestureState;
          if (
            event.nativeEvent.pageX >= countBoxLeft &&
            event.nativeEvent.pageX <= countBoxRight &&
            event.nativeEvent.pageY >= countBoxTop &&
            event.nativeEvent.pageY <= countBoxBottom
          ) {
            return true;
          }
          return false;
          // return true;
        },
        onPanResponderMove: (event, gestureState) => {
          const x = event.nativeEvent.pageX;
          const y = event.nativeEvent.pageY;

          const aboveBox = y < countBoxTop;
          const belowBox = y > countBoxBottom;
          const yDistanceToBox = aboveBox
            ? countBoxTop - y
            : belowBox
            ? y - countBoxBottom
            : 0;

          if (yDistanceToBox >= 0) {
            setShowDragNumber(true);

            //should scale these with screen size

            const numHealth =
              yDistanceToBox < 50
                ? 0
                : Math.floor(Math.exp(yDistanceToBox / 90));
            const dragNumber = aboveBox ? numHealth : -numHealth;
            setDragNumber(dragNumber);
          } else {
            setShowDragNumber(false);
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          setShowDragNumber(false);
        },
        onPanResponderTerminate: () => {
          setShowDragNumber(false);
        }
      }),
    [countBoxTop, countBoxBottom, countBoxLeft, countBoxRight]
  );

  // console.log(`width of entire screen ${window.outerWidth}`);
  // console.log(`height of entire screen ${window.innerHeight}`);

  return (
    <View style={styles.container} {...tapResponder.panHandlers}>
      <View
        {...panResponder.panHandlers}
        ref={countBoxRef}
        onLayout={() => {
          countBoxRef.current.measure((x, y, width, height, pageX, pageY) => {
            setCountBoxTop(pageY);
            setCountBoxBottom(height + pageY);
            setCountBoxLeft(pageX);
            setCountBoxRight(width + pageX);
          });
        }}>
        {
          count > 0 ? (
            <Text style={styles.text}>{count}</Text>
          ) : (
            //Same size as text
            <Image
              style={{ width: 200, height: 200 }}
              source={skullIcon}
              onProgress={() => setCount(20)}
            />
          )
          // <Image source={skullIcon} />
        }
      </View>
      <Text style={[{ opacity: 0 }]}> HI LIVI!!!</Text>
      {
        <Text
          style={[styles.dragNumber, { opacity: showDragNumber ? 100 : 0 }]}>
          {dragNumber > 0 ? '+' : ''}
          {dragNumber}
        </Text>
      }
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
