import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  PanResponder,
  Dimensions
} from 'react-native';

import skullIcon from '../icons/skullWhite.png';

export default function Count({
  textColour = '#ffffffa0',
  rotation = '0deg',
  life,
  setLife
}) {
  const [dragNumber, setDragNumber] = useState(0);
  const [showDragNumber, setShowDragNumber] = useState(false);

  const countBoxRef = useRef(null);
  const [countBoxTop, setCountBoxTop] = useState();
  const [countBoxBottom, setCountBoxBottom] = useState(0);
  const { height: screenHeight } = Dimensions.get('window');

  // const skullIcon = require('../icons/skullWhite.png');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      transform: [{ rotate: rotation }]
    },
    text: {
      fontSize: 120,
      //white
      color: textColour,
      fontFamily: 'Immortal'
    },
    dragNumber: {
      fontSize: 60,
      marginTop: 10,
      color: textColour
    }
  });

  useEffect(() => {
    if (showDragNumber == false) {
      setLife((prevCount) =>
        prevCount + dragNumber < 0 ? 0 : prevCount + dragNumber
      );
      setDragNumber(0);
    }
  }, [showDragNumber]);

  const swipeResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (event, gestureState) => {
          return true;
        },
        onPanResponderMove: (event, gestureState) => {
          const normalizedSwipeLength = Math.abs(
            gestureState.dy / screenHeight
          );
          const above = gestureState.dy < 0;

          if (normalizedSwipeLength >= 0.05) {
            setShowDragNumber(true);

            var numHealth = Math.floor((10 * normalizedSwipeLength) ** 1.3);
            // normalizedSwipeLength < 0.05
            //   ? 0
            //   :

            if (rotation !== '0deg') {
              numHealth = numHealth * -1;
            }
            above ? setDragNumber(numHealth) : setDragNumber(-numHealth);
          } else {
            setShowDragNumber(false);
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dy == 0 && showDragNumber == false) {
            const y = gestureState.y0;

            const centreOfBox = (countBoxTop + countBoxBottom) / 2;
            setLife((prevCount) => {
              var toAdd =
                y !== 0 ? (y < centreOfBox ? 1 : -1) : y < centreOfBox ? 1 : 0;
              if (rotation !== '0deg') {
                toAdd = toAdd * -1;
              }
              return prevCount + toAdd;
            });
          }

          setShowDragNumber(false);
        },
        onPanResponderTerminate: () => {
          setShowDragNumber(false);
        }
      }),
    [countBoxTop, countBoxBottom]
  );

  return (
    <View style={styles.container} {...swipeResponder.panHandlers}>
      <View
        // style={styles.container}
        ref={countBoxRef}
        onLayout={() => {
          countBoxRef.current.measure((x, y, width, height, pageX, pageY) => {
            setCountBoxTop(pageY);
            setCountBoxBottom(height + pageY);
          });
        }}>
        {life > 0 ? (
          <Text style={[styles.text]}>{life}</Text>
        ) : (
          <Image style={{ width: 200, height: 200 }} source={skullIcon} />
        )}
      </View>
      {/* <Text style={{ opacity: 0 }}> HI LIVI!!!</Text> */}

      {
        <View
          style={{ flexDirection: 'row', opacity: showDragNumber ? 100 : 0 }}>
          <Text style={[styles.dragNumber]}>{dragNumber > 0 ? '+' : ''}</Text>
          <Text style={[styles.dragNumber, { fontFamily: 'Immortal' }]}>
            {dragNumber}
          </Text>
        </View>
      }
    </View>
  );
}
