import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  PanResponder,
  Dimensions,
  Animated
} from 'react-native';

import skullIcon from '../icons/skullWhite.png';

export default function DragQueen({
  textColour = '#ffffffa0',
  life,
  setLife,
  rotation = '0deg'
}) {
  const [dragNumber, setDragNumber] = useState(0);
  const [showDragNumber, setShowDragNumber] = useState(false);

  const [adjustmentNumber, setAdjustmentNumber] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animated value for opacity

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
      width: '100%',
      transform: [{ rotate: rotation }]
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

  let fadeOutAnimation;

  const updateLife = (amount) => {
    setAdjustmentNumber((prevAdjustment) => prevAdjustment + amount);

    // Show adjustment number with fade-in effect
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();

    // Reset adjustment number after 3 seconds with fade-out
    if (adjustmentTimeoutRef.current) {
      clearTimeout(adjustmentTimeoutRef.current);
    }
    if (fadeOutAnimation) {
      fadeOutAnimation.stop(); // Cancels the animation
    }
    adjustmentTimeoutRef.current = setTimeout(() => {
      fadeOutAnimation = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start(({ finished }) => {
        if (finished) {
          setAdjustmentNumber(0);
        }
      }); // Reset adjustment number to 0
    }, 5000);
    setLife((prevLife) => {
      return prevLife + amount;
    });
  };

  useEffect(() => {
    if (!showDragNumber) {
      if (dragNumber !== 0) {
        updateLife(dragNumber); // Apply the drag number to life
        setDragNumber(0);
      }
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

            // Cancel any fades that may be happening
            if (adjustmentTimeoutRef.current) {
              clearTimeout(adjustmentTimeoutRef.current);
              adjustmentTimeoutRef.current = null; // Clean up the reference
              // To cancel the animation before it completes:
            }
            if (fadeOutAnimation) {
              fadeOutAnimation.stop(); // Cancels the animation
            }
            fadeAnim.setValue(1);
            var numHealth = Math.floor((10 * normalizedSwipeLength) ** 1.3);
            if (!above) {
              numHealth = numHealth * -1;
            }
            if (rotation !== '0deg') {
              numHealth = numHealth * -1;
            }

            setDragNumber(numHealth);
          } else {
            setShowDragNumber(false);
          }
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (Math.abs(gestureState.dy) < 5 && !showDragNumber) {
            const y = gestureState.y0;
            const centerOfBox = (countBoxTop + countBoxBottom) / 2;
            var toAdd = y < centerOfBox ? 1 : -1;
            if (rotation !== '0deg') {
              toAdd = toAdd * -1;
            }
            updateLife(toAdd);
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
          <Text style={[styles.text]}>{life + dragNumber}</Text>
        ) : (
          <Image
            style={{ width: 200, height: 200, opacity: 0.7 }}
            source={skullIcon}
          />
        )}
      </View>

      {/* Adjustment Number Display */}
      <Animated.View
        style={{
          flexDirection: 'row',
          opacity: fadeAnim // Bind opacity to Animated.Value
        }}>
        <Text style={[styles.dragNumber]}>
          {adjustmentNumber + dragNumber > 0 ? '+' : ''}
        </Text>
        <Text style={[{ fontFamily: 'Immortal' }, styles.dragNumber]}>
          {adjustmentNumber + dragNumber}
        </Text>
      </Animated.View>
    </View>
  );
}
