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

import Sparkles from '../../components/Sparkle/Sparkles';
import skullIcon from '../../icons/skullWhite.png';

export default function Count({
  textColour = '#ffffffa0',
  life,
  setLife,
  rotation = '0deg',
  tutorialState,
  setTutorialState
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

  useEffect(() => {
    // Show adjustment number with fade-in effect
    if (tutorialState === 'trackingNumber') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
    }
  }, [tutorialState]);

  const updateLife = (amount) => {
    setLife((prevLife) => {
      // const newLife = Math.max(prevLife + amount, 0); // Prevent negative life

      // Add the change to the current adjustment number
      setAdjustmentNumber((prevAdjustment) => prevAdjustment + amount);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();

      // Reset adjustment number after 3 seconds with fade-out
      if (adjustmentTimeoutRef.current) {
        clearTimeout(adjustmentTimeoutRef.current);
      }

      if (!['trackingNumber', 'swipeUp', 'tapDown'].includes(tutorialState)) {
        adjustmentTimeoutRef.current = setTimeout(() => {
          fadeOutAnimation = Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true
          }).start(({ finished }) => {
            if (finished) {
              console.log('erasure State', tutorialState);
              setAdjustmentNumber(0);
            }
          }); // Reset adjustment number to 0
        }, 3000);
      }

      return prevLife + amount;
    });
  };

  useEffect(() => {
    if (!showDragNumber) {
      if (dragNumber !== 0) {
        if (
          dragNumber > 2 &&
          (tutorialState == 'swipeUp' || tutorialState == 'again')
        ) {
          setTutorialState();
        }
        if (dragNumber < -2 && tutorialState == 'swipeDown') {
          setTutorialState();
        }

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
          if (gestureState.dy === 0 && !showDragNumber) {
            const y = gestureState.y0;
            const centerOfBox = (countBoxTop + countBoxBottom) / 2;
            var toAdd = y < centerOfBox ? 1 : -1;
            if (rotation !== '0deg') {
              toAdd = toAdd * -1;
            }
            console.log(tutorialState, ' tutorial state in dragqueen');
            // TUTORIAL
            if (toAdd === 1 && tutorialState == 'tapUp') {
              setTutorialState();
            }
            if (toAdd === -1 && tutorialState == 'tapDown') {
              setTutorialState();
            }

            updateLife(toAdd);
          }
          setShowDragNumber(false);
        },
        onPanResponderTerminate: () => {
          setShowDragNumber(false);
        }
      }),
    [countBoxTop, countBoxBottom, tutorialState]
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
          <Sparkles on={tutorialState === 'lifeTotal'}>
            <Text style={[styles.text]}>{life + dragNumber}</Text>
          </Sparkles>
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
        <Sparkles
          on={['trackingNumber', 'again', 'swipeUp'].includes(tutorialState)}>
          <View
            style={{
              flexDirection: 'row'
            }}>
            <Text style={[styles.dragNumber]}>
              {adjustmentNumber + dragNumber > 0 ? '+' : ''}
            </Text>
            <Text style={[{ fontFamily: 'Immortal' }, styles.dragNumber]}>
              {adjustmentNumber + dragNumber}
            </Text>
          </View>
        </Sparkles>
      </Animated.View>
    </View>
  );
}
