import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native';

export default function DragAndDrop({ children }) {
  // Create a ref to store the position of the card
  const position = useRef(new Animated.ValueXY()).current;

  // State to track if the card is being dragged
  const [dragging, setDragging] = useState(false);

  // Create a pan responder to handle touch events
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // When touch gesture starts, set dragging to true
        setDragging(true);
        position.setOffset({
          x: position.x._value,
          y: position.y._value
        });
        position.setValue({ x: 0, y: 0 }); // Reset animated value to 0 relative to offset
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: position.x,
            dy: position.y
          }
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        // When touch gesture is released, set dragging to false
        setDragging(false);
        position.flattenOffset(); // Merge offset into base value
      }
    })
  ).current;

  const windowWidth = Dimensions.get('window').width;
  const size = windowWidth * 0.4;

  return (
    <Animated.View
      style={{
        height: size,
        width: size,
        zIndex: 10,
        transform: position.getTranslateTransform(),
        opacity: dragging ? 0.7 : 1
      }}
      {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
}
