import React, { useState, useEffect, useRef, useMemo } from 'react';
import { View, Text, Image, StyleSheet, PanResponder } from 'react-native';

export default function Tapper({ inverse = false, life, setLife }) {
  const countBoxRef = useRef(null);
  const [countBoxTop, setCountBoxTop] = useState();
  const [countBoxBottom, setCountBoxBottom] = useState(0);
  const skullIcon = require('../icons/skullWhite.png');

  const tapResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (event) => {
          return true;
          // return (
          //   event.nativeEvent.pageY < countBoxTop ||
          //   event.nativeEvent.pageY > countBoxBottom
          // );
        },
        onPanResponderRelease: (event, gestureState) => {
          const y = event.nativeEvent.pageY;
          const centreOfBox = (countBoxTop + countBoxBottom) / 2;
          console.log('y', y);
          console.log('centreOfBox', centreOfBox);
          setLife((prevCount) => {
            const newCount = y < centreOfBox ? prevCount - 1 : prevCount + 1;
            return newCount;
          });
        }
      }),
    [countBoxTop, countBoxBottom]
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

        {life > 0 ? (
          <Text
            style={{
              fontSize: 100,
              color: '#fff',
              fontWeight: 'bold',
              transform: [{ rotate: '180deg' }]
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
    color: '#fff',
    fontWeight: 'bold'
  }
});
