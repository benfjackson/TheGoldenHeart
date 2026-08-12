import { useState, useRef, useEffect, useCallback } from 'react';

const DEFAULT_FADE_DELAY_MS = 5000;
const FADE_OUT_MS = 1000;

export default function useAdjustmentTracker({
  fadeDelayMs = DEFAULT_FADE_DELAY_MS,
  autoFade = true
} = {}) {
  const [adjustmentTotal, setAdjustmentTotal] = useState(0);
  const [trackerOpacity, setTrackerOpacity] = useState(0);
  const timeoutRef = useRef(null);
  const fadeOutTimeoutRef = useRef(null);
  const autoFadeRef = useRef(autoFade);
  const fadeDelayRef = useRef(fadeDelayMs);

  autoFadeRef.current = autoFade;
  fadeDelayRef.current = fadeDelayMs;

  const clearScheduledFade = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }
  }, []);

  const scheduleFadeOut = useCallback(() => {
    if (!autoFadeRef.current) {
      return;
    }

    clearScheduledFade();
    timeoutRef.current = setTimeout(() => {
      setTrackerOpacity(0);
      fadeOutTimeoutRef.current = setTimeout(() => {
        setAdjustmentTotal(0);
        fadeOutTimeoutRef.current = null;
      }, FADE_OUT_MS);
    }, fadeDelayRef.current);
  }, [clearScheduledFade]);

  const recordChange = useCallback(
    (amount) => {
      if (amount === 0) {
        return;
      }

      setAdjustmentTotal((prev) => prev + amount);
      clearScheduledFade();
      setTrackerOpacity(1);
      scheduleFadeOut();
    },
    [clearScheduledFade, scheduleFadeOut]
  );

  const holdVisible = useCallback(() => {
    clearScheduledFade();
    setTrackerOpacity(1);
  }, [clearScheduledFade]);

  useEffect(() => () => clearScheduledFade(), [clearScheduledFade]);

  return {
    adjustmentTotal,
    trackerOpacity,
    recordChange,
    holdVisible
  };
}
