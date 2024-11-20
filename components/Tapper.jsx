import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, Image, StyleSheet, PanResponder } from 'react-native';

export default function Tapper({
  skull = true,
  inverse = false,
  life,
  setLife,
  size = 'guest'
}) {
  const countBoxRef = useRef(null);
  const [countBoxTop, setCountBoxTop] = useState();
  const [countBoxBottom, setCountBoxBottom] = useState(0);
  const skullIcon = require('../icons/skullWhite.png');

  // const sizeMap = {
  //   guest: 100,
  //   counter: 60
  // };

  const calcNewCount = (y) => {
    const centreOfBox = (countBoxTop + countBoxBottom) / 2;
    // console.log('y', y);
    // console.log('centreOfBox', centreOfBox);

    var toAdd = y < centreOfBox ? -1 : 1;
    var inverseN = inverse ? 1 : -1;
    var newCount = life + toAdd * inverseN;
    if (life === 0 && toAdd * inverseN < 0) {
      return 0;
    } else {
      return newCount;
    }
  };

  const tapResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (event) => {
          return true;
        },
        onPanResponderRelease: (event, gestureState) => {
          const y = event.nativeEvent.pageY;
          setLife(calcNewCount(y));
        }
      }),
    [countBoxTop, countBoxBottom, life]
  );

  return (
    <View style={styles.container} {...tapResponder.panHandlers}>
      <View
        ref={countBoxRef}
        onLayout={() => {
          countBoxRef.current.measure((x, y, width, height, pageX, pageY) => {
            setCountBoxTop(pageY);
            setCountBoxBottom(height + pageY);
          });
        }}>
        {/* TO ROTATE 180, 
        <Image style={{ width: 200, height: 200, transform: [{ rotate: '180deg' }] }} source={skullIcon} />
        */}

        {life > 0 || !skull ? (
          <Text
            style={{
              fontSize: 80,
              color: '#ffffffa0',
              transform: [{ rotate: inverse ? '180deg' : '0deg' }],
              fontFamily: 'Immortal'
            }}>
            {life}
          </Text>
        ) : (
          <Image
            style={{
              width: 200,
              height: 200,
              transform: [{ rotate: '180deg' }]
            }}
            source={skullIcon}
          />
        )}
      </View>
      <Text style={{ opacity: 0 }}> HI LIVI!!!</Text>
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
    color: '#fff'
  }
});
