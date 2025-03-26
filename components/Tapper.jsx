import React, { useState, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, PanResponder } from 'react-native';

export default function Tapper({ inverse = false, life, setLife }) {
  const countBoxRef = useRef(null);
  const [countBoxTop, setCountBoxTop] = useState();
  const [countBoxBottom, setCountBoxBottom] = useState(0);

  const updateLife = (toAdd) => {
    setLife(life + toAdd);
  };

  const tapResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: (event) => {
          //might need logic in here
          return true;
          // return false;
        },

        onPanResponderRelease: (evt, gestureState) => {
          if (Math.abs(gestureState.dy) < 5) {
            var y0 = gestureState.y0;
            countBoxRef.current.measureInWindow((x, y, width, height) => {
              var center = y + height / 2;
              var toAdd = y0 < center ? 1 : -1;

              updateLife(toAdd);
            });
          }
        }
      }),
    [countBoxTop, countBoxBottom, life]
  );

  return (
    <View
      style={styles.container}
      {...tapResponder.panHandlers}
      pointerEvents="box-only">
      <View
        ref={countBoxRef}
        onLayout={() => {
          countBoxRef.current.measure((x, y, width, height, pageX, pageY) => {
            setCountBoxTop(pageY);
            setCountBoxBottom(height + pageY);
          });
        }}>
        <Text
          style={{
            fontSize: 80,
            color: '#ffffffa0',
            transform: [{ rotate: inverse ? '180deg' : '0deg' }],
            fontFamily: 'Immortal'
          }}>
          {life}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%'
  },
  text: {
    fontSize: 100,
    color: '#fff'
  }
});
