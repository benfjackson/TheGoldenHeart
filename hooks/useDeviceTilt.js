import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Accelerometer, DeviceMotion } from 'expo-sensors';
import { useSharedValue } from 'react-native-reanimated';

const MAX_TILT_G = 0.35;
const SMOOTHING = 0.2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function ensureMotionPermission() {
  if (Platform.OS !== 'ios') {
    return true;
  }

  const existing = await DeviceMotion.getPermissionsAsync();
  if (existing.granted) {
    return true;
  }

  const requested = await DeviceMotion.requestPermissionsAsync();
  return requested.granted;
}

export default function useDeviceTilt({
  updateIntervalMs = 16,
  quantizeStep = 0
} = {}) {
  const tiltX = useSharedValue(0);
  const tiltY = useSharedValue(0);
  const neutralRef = useRef(null);
  const smoothRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let subscription;
    let active = true;

    const start = async () => {
      const permitted = await ensureMotionPermission();
      if (!permitted || !active) {
        return;
      }

      const available = await Accelerometer.isAvailableAsync();
      if (!available || !active) {
        return;
      }

      Accelerometer.setUpdateInterval(updateIntervalMs);
      subscription = Accelerometer.addListener(({ x, y }) => {
        if (!neutralRef.current) {
          neutralRef.current = { x, y };
        }

        const targetX = clamp(
          (x - neutralRef.current.x) / MAX_TILT_G,
          -1,
          1
        );
        const targetY = clamp(
          (y - neutralRef.current.y) / MAX_TILT_G,
          -1,
          1
        );

        smoothRef.current.x +=
          (targetX - smoothRef.current.x) * SMOOTHING;
        smoothRef.current.y +=
          (targetY - smoothRef.current.y) * SMOOTHING;

        let nextX = smoothRef.current.x;
        let nextY = smoothRef.current.y;

        if (quantizeStep > 0) {
          nextX = Math.round(nextX / quantizeStep) * quantizeStep;
          nextY = Math.round(nextY / quantizeStep) * quantizeStep;
        }

        if (nextX === tiltX.value && nextY === tiltY.value) {
          return;
        }

        tiltX.value = nextX;
        tiltY.value = nextY;
      });
    };

    start();

    return () => {
      active = false;
      subscription?.remove();
      tiltX.value = 0;
      tiltY.value = 0;
    };
  }, [tiltX, tiltY, updateIntervalMs, quantizeStep]);

  return { x: tiltX, y: tiltY };
}
