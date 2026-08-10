import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { PanResponder, Dimensions } from 'react-native';

const SWIPE_THRESHOLD = 0.05;
const TAP_THRESHOLD = 5;

function computeSwipeDelta(primaryDelta, screenDimension, axis, isRotated) {
  const normalized = Math.abs(primaryDelta / screenDimension);
  if (normalized < SWIPE_THRESHOLD) {
    return null;
  }

  const isPositiveDirection = primaryDelta < 0;
  let delta = Math.floor((10 * normalized) ** 1.3);
  if (!isPositiveDirection) {
    delta *= -1;
  }
  if (axis === 'vertical' && isRotated) {
    delta *= -1;
  }
  return delta;
}

export default function useLifeCounterGesture({
  axis = 'vertical',
  rotation = '0deg',
  containerRef,
  onCommit,
  onSwipeStart
}) {
  const [previewDelta, setPreviewDelta] = useState(0);
  const gestureRef = useRef({ mode: 'idle' });
  const previewDeltaRef = useRef(0);
  const onCommitRef = useRef(onCommit);
  const onSwipeStartRef = useRef(onSwipeStart);
  const screenDimensionRef = useRef(
    axis === 'vertical'
      ? Dimensions.get('window').height
      : Dimensions.get('window').width
  );

  const isRotated = rotation !== '0deg';

  useEffect(() => {
    onCommitRef.current = onCommit;
  }, [onCommit]);

  useEffect(() => {
    onSwipeStartRef.current = onSwipeStart;
  }, [onSwipeStart]);

  const commitPreview = useCallback(() => {
    const delta = previewDeltaRef.current;
    if (delta !== 0) {
      onCommitRef.current(delta);
    }
    gestureRef.current.mode = 'idle';
    previewDeltaRef.current = 0;
    setPreviewDelta(0);
  }, []);

  const resetPreview = useCallback(() => {
    gestureRef.current.mode = 'idle';
    previewDeltaRef.current = 0;
    setPreviewDelta(0);
  }, []);

  const handleTap = useCallback(
    (gestureState) => {
      const node = containerRef.current;
      if (!node) {
        return;
      }

      node.measureInWindow((x, y, width, height) => {
        let delta;
        if (axis === 'vertical') {
          const center = y + height / 2;
          delta = gestureState.y0 < center ? 1 : -1;
          if (isRotated) {
            delta *= -1;
          }
        } else {
          const center = x + width / 2;
          delta = gestureState.x0 < center ? 1 : -1;
        }
        onCommitRef.current(delta);
      });
    },
    [axis, containerRef, isRotated]
  );

  const panHandlers = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const primaryDelta =
          axis === 'vertical' ? gestureState.dy : gestureState.dx;
        const delta = computeSwipeDelta(
          primaryDelta,
          screenDimensionRef.current,
          axis,
          isRotated
        );

        if (delta !== null) {
          if (gestureRef.current.mode !== 'swiping') {
            gestureRef.current.mode = 'swiping';
            onSwipeStartRef.current?.();
          }
          previewDeltaRef.current = delta;
          setPreviewDelta(delta);
          return;
        }

        if (gestureRef.current.mode === 'swiping') {
          const pending = previewDeltaRef.current;
          if (pending !== 0) {
            onCommitRef.current(pending);
          }
          gestureRef.current.mode = 'idle';
          previewDeltaRef.current = 0;
          setPreviewDelta(0);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        const primaryMovement =
          axis === 'vertical'
            ? Math.abs(gestureState.dy)
            : Math.abs(gestureState.dx);

        if (
          primaryMovement < TAP_THRESHOLD &&
          gestureRef.current.mode === 'idle'
        ) {
          handleTap(gestureState);
          resetPreview();
          return;
        }

        if (gestureRef.current.mode === 'swiping') {
          commitPreview();
          return;
        }

        resetPreview();
      },
      onPanResponderTerminate: () => {
        if (gestureRef.current.mode === 'swiping') {
          commitPreview();
          return;
        }
        resetPreview();
      }
    }).panHandlers;
  }, [axis, commitPreview, handleTap, isRotated, resetPreview]);

  return { previewDelta, panHandlers };
}
