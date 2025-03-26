import React, { useRef, useState, useMemo } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Animated,
  PanResponder
} from 'react-native';
import CounterImage from '../../../images/Counter.png';

function Label({ counterName }) {
  switch (counterName) {
    case 'Commander damage':
      return <Text style={styles.labelText}>Commander</Text>;
    default:
      return <Text style={styles.labelText}>{counterName}</Text>;
  }
}

/**
 * DraggableTapper combines drag-and-drop with tap detection.
 * - Dragging: moves the Animated.View around.
 * - Tapping: if the gesture movement is minimal, it checks whether the tap occurred in the upper half (to add 1)
 *   or in the lower half (to subtract 1) and calls updateLife accordingly.
 */
function DraggableTapper({ life, updateLife, inverse = false, counterName }) {
  const position = useRef(new Animated.ValueXY()).current;
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const [layout, setLayout] = useState(null);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          setDragging(true);
          position.setOffset({
            x: position.x._value,
            y: position.y._value
          });
          position.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event(
          [null, { dx: position.x, dy: position.y }],
          { useNativeDriver: false }
        ),
        onPanResponderRelease: (evt, gestureState) => {
          position.flattenOffset();
          setDragging(false);
          // If movement is minimal, treat as a tap
          if (Math.abs(gestureState.dy) < 5) {
            var y0 = gestureState.y0;
            containerRef.current.measureInWindow((x, y, width, height) => {
              var center = y + height / 2;
              var toAdd = y0 < center ? 1 : -1;

              updateLife(toAdd);
            });
          }
        }
      }),
    [layout, updateLife]
  );

  const windowWidth = Dimensions.get('window').width;
  const size = windowWidth * 0.4;

  return (
    <Animated.View
      ref={containerRef}
      style={[
        styles.draggableContainer,
        {
          height: size,
          width: size,
          opacity: dragging ? 0.7 : 1,
          transform: position.getTranslateTransform()
        }
      ]}
      onLayout={() => {
        // Measure the container so we can determine its vertical center for tap logic
        containerRef.current.measure((x, y, width, height, pageX, pageY) => {
          setLayout({ top: pageY, bottom: pageY + height });
        });
      }}
      {...panResponder.panHandlers}>
      <View style={styles.tapArea}>
        <ImageBackground
          style={[
            styles.background,
            {
              height: size,
              width: size
            }
          ]}
          source={CounterImage}>
          <Text
            style={[
              styles.lifeText,
              { transform: [{ rotate: inverse ? '180deg' : '0deg' }] }
            ]}>
            {life}
          </Text>
          <Label counterName={counterName} />
        </ImageBackground>
      </View>
    </Animated.View>
  );
}

export default function Counter({ counter }) {
  const { count, counterName, setCount } = counter;

  const updateLife = (toAdd) => {
    setCount(count + toAdd);
  };

  return (
    <DraggableTapper
      life={count}
      updateLife={updateLife}
      counterName={counterName}
    />
    // </ImageBackground>
  );
}

const styles = StyleSheet.create({
  labelText: {
    // position: 'absolute',
    // top: '40%',
    // left: '20%',
    width: '100%',
    marginTop: '-15%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#FFA500',
    fontFamily: 'Endor'
  },
  background: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  draggableContainer: {
    zIndex: 10
  },
  tapArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lifeText: {
    fontSize: 80,
    color: '#ffffffa0',
    fontFamily: 'Immortal'
  }
});
