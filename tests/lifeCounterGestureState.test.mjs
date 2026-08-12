import assert from 'node:assert/strict';
import test from 'node:test';
import * as gestureState from '../hooks/lifeCounterGestureState.js';

test('a touch previews and then commits its tap delta', () => {
  assert.equal(typeof gestureState.beginGesture, 'function');
  assert.equal(typeof gestureState.finishGesture, 'function');

  const pressing = gestureState.beginGesture(1);

  assert.deepEqual(pressing, {
    mode: 'pressing',
    tapDelta: 1,
    previewDelta: 1
  });
  assert.equal(gestureState.finishGesture(pressing), 1);
});

test('small movement remains a tap but crossing touch slop becomes a drag', () => {
  assert.equal(typeof gestureState.moveGesture, 'function');

  const pressing = gestureState.beginGesture(-1);
  const jittered = gestureState.moveGesture(pressing, {
    dx: 6,
    dy: 6,
    swipeDelta: null
  });
  const swiping = gestureState.moveGesture(jittered, {
    dx: 8,
    dy: 8,
    swipeDelta: 2
  });

  assert.deepEqual(jittered, pressing);
  assert.deepEqual(swiping, {
    mode: 'swiping',
    tapDelta: 0,
    previewDelta: 2
  });
  assert.equal(gestureState.finishGesture(swiping), 2);
});

test('vertical taps use the touched half and account for rotation', () => {
  assert.equal(typeof gestureState.getTapDelta, 'function');

  const topTap = {
    axis: 'vertical',
    isRotated: false,
    locationX: 50,
    locationY: 25,
    width: 100,
    height: 100
  };

  assert.equal(gestureState.getTapDelta(topTap), 1);
  assert.equal(gestureState.getTapDelta({ ...topTap, locationY: 75 }), -1);
  assert.equal(gestureState.getTapDelta({ ...topTap, isRotated: true }), -1);
});

test('horizontal taps use the touched half', () => {
  const leftTap = {
    axis: 'horizontal',
    isRotated: false,
    locationX: 25,
    locationY: 50,
    width: 100,
    height: 100
  };

  assert.equal(gestureState.getTapDelta(leftTap), 1);
  assert.equal(gestureState.getTapDelta({ ...leftTap, locationX: 75 }), -1);
});
