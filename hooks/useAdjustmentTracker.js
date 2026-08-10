import { useState, useRef, useEffect, useCallback } from 'react';
import { Animated } from 'react-native';

const DEFAULT_FADE_DELAY_MS = 5000;

export default function useAdjustmentTracker({
  fadeDelayMs = DEFAULT_FADE_DELAY_MS,
  autoFade = true
} = {}) {
  const [adjustmentTotal, setAdjustmentTotal] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeoutRef = useRef(null);
  const fadeOutRef = useRef(null);
  const autoFadeRef = useRef(autoFade);
  const fadeDelayRef = useRef(fadeDelayMs);

  autoFadeRef.current = autoFade;
  fadeDelayRef.current = fadeDelayMs;

  const clearScheduledFade = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (fadeOutRef.current) {
      fadeOutRef.current.stop();
      fadeOutRef.current = null;
    }
  }, []);

  const scheduleFadeOut = useCallback(() => {
    if (!autoFadeRef.current) {
      return;
    }
    clearScheduledFade();
    timeoutRef.current = setTimeout(() => {
      fadeOutRef.current = Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      });
      fadeOutRef.current.start(({ finished }) => {
        if (finished) {
          setAdjustmentTotal(0);
        }
      });
    }, fadeDelayRef.current);
  }, [clearScheduledFade, fadeAnim]);

  const recordChange = useCallback(
    (amount) => {
      if (amount === 0) {
        return;
      }
      setAdjustmentTotal((prev) => prev + amount);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      }).start();
      scheduleFadeOut();
    },
    [fadeAnim, scheduleFadeOut]
  );

  const holdVisible = useCallback(() => {
    clearScheduledFade();
    fadeAnim.setValue(1);
  }, [clearScheduledFade, fadeAnim]);

  useEffect(() => () => clearScheduledFade(), [clearScheduledFade]);

  return {
    adjustmentTotal,
    fadeAnim,
    recordChange,
    holdVisible
  };
}
