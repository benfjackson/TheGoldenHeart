import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { Accelerometer, DeviceMotion } from 'expo-sensors';

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

export default function useDeviceTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
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

      Accelerometer.setUpdateInterval(16);

      subscription = Accelerometer.addListener(({ x, y }) => {
        if (!neutralRef.current) {
          neutralRef.current = { x, y };
        }

        const { x: neutralX, y: neutralY } = neutralRef.current;
        const targetX = clamp((x - neutralX) / MAX_TILT_G, -1, 1);
        const targetY = clamp((y - neutralY) / MAX_TILT_G, -1, 1);

        smoothRef.current.x +=
          (targetX - smoothRef.current.x) * SMOOTHING;
        smoothRef.current.y +=
          (targetY - smoothRef.current.y) * SMOOTHING;

        setTilt({
          x: smoothRef.current.x,
          y: smoothRef.current.y
        });
      });
    };

    start();

    return () => {
      active = false;
      subscription?.remove();
    };
  }, []);

  return tilt;
}
