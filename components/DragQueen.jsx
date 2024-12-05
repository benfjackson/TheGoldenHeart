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

export default function Count({ textColour = '#ffffffa0', life, setLife }) {
  const [dragNumber, setDragNumber] = useState(0);
  const [showDragNumber, setShowDragNumber] = useState(false);

  const [adjustmentNumber, setAdjustmentNumber] = useState(0);
  const [showAdjustmentNumber, setShowAdjustmentNumber] = useState(false);
  const adjustmentOpacity = useRef(new Animated.Value(1)).current;

  const adjustmentTimeoutRef = useRef(null);

  const countBoxRef = useRef(null);
  const [countBoxTop, setCountBoxTop] = useState();
  const [countBoxBottom, setCountBoxBottom] = useState(0);
  const { height: screenHeight } = Dimensions.get('window');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    text: {
      fontSize: 120,
      color: textColour,
      fontFamily: 'Immortal'
    },
    dragNumber: {
      fontSize: 60,
      marginTop: 10,
      color: textColour
    }
  });

  const updateLife = (amount) => {
    setLife((prevLife) => {
      const newLife = Math.max(prevLife + amount, 0); // Prevent negative life

      // Add the change to the current adjustment number
      setAdjustmentNumber((prevAdjustment) => prevAdjustment + amount);
      setShowAdjustmentNumber(true);

      // Reset adjustment number after 3 seconds
      if (adjustmentTimeoutRef.current) {
        clearTimeout(adjustmentTimeoutRef.current);
      }
      adjustmentTimeoutRef.current = setTimeout(() => {
        setShowAdjustmentNumber(false);
        setAdjustmentNumber(0);
      }, 3000);

      return newLife;
    });
  };

  useEffect(() => {
    if (!showDragNumber) {
      updateLife(dragNumber); // Apply the drag number to life
      setDragNumber(0);
    }
  }, [showDragNumber]);

  const swipeResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
          const normalizedSwipeLength = Math.abs(
            gestureState.dy / screenHeight
          );
          const above = gestureState.dy < 0;

          if (normalizedSwipeLength >= 0.05) {
            setShowDragNumber(true);
            const numHealth = Math.floor((10 * normalizedSwipeLength) ** 1.3);

            // Reset adjustment number after 3 seconds
            if (adjustmentTimeoutRef.current) {
              clearTimeout(adjustmentTimeoutRef.current);
            }
            adjustmentTimeoutRef.current = setTimeout(() => {
              setShowAdjustmentNumber(false);
              setAdjustmentNumber(0);
            }, 3000);

            above ? setDragNumber(numHealth) : setDragNumber(-numHealth);
          } else {
            setShowDragNumber(false);
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dy === 0 && !showDragNumber) {
            const y = gestureState.y0;
            const centerOfBox = (countBoxTop + countBoxBottom) / 2;
            updateLife(y < centerOfBox ? 1 : -1);
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

      {/* Drag Number Display */}
      {/* <View style={{ flexDirection: 'row', opacity: showDragNumber ? 1 : 0 }}>
        <Text style={[styles.dragNumber]}>{dragNumber > 0 ? '+' : ''}</Text>
        <Text style={[{ fontFamily: 'Immortal' }, styles.dragNumber]}>
          {dragNumber}
        </Text>
      </View> */}

      {/* Adjustment Number Display */}
      <View
        style={{
          flexDirection: 'row',
          opacity:
            (showAdjustmentNumber && adjustmentNumber !== 0) || showDragNumber
              ? 1
              : 0
        }}>
        <Text style={[styles.dragNumber]}>
          {adjustmentNumber + dragNumber > 0 ? '+' : ''}
        </Text>
        <Text style={[{ fontFamily: 'Immortal' }, styles.dragNumber]}>
          {adjustmentNumber + dragNumber}
        </Text>
      </View>
    </View>
  );
}
