import { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { PanResponder, Dimensions } from 'react-native';
import {
  beginGesture,
  finishGesture,
  getTapDelta,
  moveGesture
} from './lifeCounterGestureState';

const SWIPE_THRESHOLD = 0.05;
const IDLE_GESTURE = {
  mode: 'idle',
  tapDelta: 0,
  previewDelta: 0
};

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
  onCommit,
  onGestureStart
}) {
  const [previewDelta, setPreviewDelta] = useState(0);
  const gestureRef = useRef(IDLE_GESTURE);
  const layoutRef = useRef({ width: 0, height: 0 });
  const onCommitRef = useRef(onCommit);
  const onGestureStartRef = useRef(onGestureStart);
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
    onGestureStartRef.current = onGestureStart;
  }, [onGestureStart]);

  const resetGesture = useCallback(() => {
    gestureRef.current = IDLE_GESTURE;
    setPreviewDelta(0);
  }, []);

  const commitGesture = useCallback(() => {
    const delta = finishGesture(gestureRef.current);
    if (delta !== 0) {
      onCommitRef.current(delta);
    }
    resetGesture();
  }, [resetGesture]);

  const onLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    layoutRef.current = { width, height };
  }, []);

  const panHandlers = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event) => {
        const { width, height } = layoutRef.current;
        if (width === 0 || height === 0) {
          resetGesture();
          return;
        }

        const { locationX, locationY } = event.nativeEvent;
        const tapDelta = getTapDelta({
          axis,
          isRotated,
          locationX,
          locationY,
          width,
          height
        });
        const gesture = beginGesture(tapDelta);
        gestureRef.current = gesture;
        setPreviewDelta(gesture.previewDelta);
        onGestureStartRef.current?.();
      },
      onPanResponderMove: (_, gestureState) => {
        const primaryDelta =
          axis === 'vertical' ? gestureState.dy : gestureState.dx;
        const swipeDelta = computeSwipeDelta(
          primaryDelta,
          screenDimensionRef.current,
          axis,
          isRotated
        );
        const gesture = moveGesture(gestureRef.current, {
          dx: gestureState.dx,
          dy: gestureState.dy,
          swipeDelta
        });

        gestureRef.current = gesture;
        setPreviewDelta(gesture.previewDelta);
      },
      onPanResponderRelease: () => {
        commitGesture();
      },
      onPanResponderTerminate: () => {
        if (gestureRef.current.mode === 'swiping') {
          commitGesture();
          return;
        }
        resetGesture();
      }
    }).panHandlers;
  }, [axis, commitGesture, isRotated, resetGesture]);

  return { previewDelta, panHandlers, onLayout };
}
