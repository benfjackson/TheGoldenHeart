export const TOUCH_SLOP = 10;

export function beginGesture(tapDelta) {
  return {
    mode: 'pressing',
    tapDelta,
    previewDelta: tapDelta
  };
}

export function moveGesture(gesture, { dx, dy, swipeDelta }) {
  if (gesture.mode === 'pressing' && Math.hypot(dx, dy) < TOUCH_SLOP) {
    return gesture;
  }

  if (gesture.mode === 'pressing' || gesture.mode === 'swiping') {
    return {
      mode: 'swiping',
      tapDelta: 0,
      previewDelta: swipeDelta ?? 0
    };
  }

  return gesture;
}

export function getTapDelta({
  axis,
  isRotated,
  locationX,
  locationY,
  width,
  height
}) {
  if (axis === 'vertical') {
    const delta = locationY < height / 2 ? 1 : -1;
    return isRotated ? -delta : delta;
  }

  return locationX < width / 2 ? 1 : -1;
}

export function finishGesture(gesture) {
  if (gesture.mode === 'pressing') {
    return gesture.tapDelta;
  }
  return gesture.previewDelta;
}
