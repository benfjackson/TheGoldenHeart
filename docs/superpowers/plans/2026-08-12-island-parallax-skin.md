# Island Parallax Skin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a reusable, config-driven parallax renderer and use it for a blue fantasy island skin with an ocean background, two floating-island depths, drifting mist, and pulsing blue glow.

**Architecture:** Treat every visual element as an ordered scene layer. A generic `ParallaxSkin` loads a local scene definition from a registry, while `ParallaxLayers` combines shared device-tilt values with optional per-layer ambient animation. Static image imports remain in the scene registry so the rendering engine is asset-agnostic and can later accept React Native `{ uri }` image sources without changing its public interface.

**Tech Stack:** Expo 57, React Native 0.86, React 19, Expo Sensors, React Native Reanimated 4, Node test runner.

## Global Constraints

- Keep the life counter fixed above the animated artwork; visual layers must use `pointerEvents="none"`.
- Use Reanimated shared values and UI-thread animated styles; do not update React state on every sensor event or animation frame.
- Preserve the existing low-pass tilt smoothing and `[-1, 1]` clamping.
- When motion permission or accelerometer access is unavailable, render neutral parallax while ambient drift and glow continue.
- Use local bundled assets for this first skin. The scene contract must also accept React Native remote sources shaped as `{ uri: string }`.
- Keep all artwork in a portrait 9:16 composition with central UI-safe negative space.
- Add no graphics dependency beyond the packages already in `package.json`.
- Register the new skin as `IslandParallax`; do not replace the existing static `Island` skin.

## File Map

- `components/ParallaxLayers/sceneMath.js`: pure validation and layout calculations.
- `components/ParallaxLayers/AnimatedParallaxLayer.jsx`: one image layer combining tilt, drift, and opacity pulse.
- `components/ParallaxLayers/index.jsx`: viewport-aware scene coordinator and public renderer.
- `hooks/useDeviceTilt.js`: sensor lifecycle and smoothed Reanimated shared tilt values.
- `skins/parallax/scenes.js`: local scene registry and static asset imports.
- `skins/parallax/ParallaxSkin.jsx`: shared life-counter composition for any registered parallax scene.
- `skins/parallax/ParallaxTestSkin.jsx`: removed after its current test scene is represented in the registry.
- `skins/parallax/IslandParallax/data.json`: skin metadata.
- `skins/parallax/IslandParallax/assets/`: supplied full-resolution scene artwork.
- `skins/parallax/IslandParallax/mini.png`: supplied carousel thumbnail.
- `screens/InGame/Skin.jsx`: route all `skinType: "parallax"` entries through `ParallaxSkin`.
- `services/getSkinInfo.jsx`: register island metadata and thumbnail.
- `screens/SelectSkin/index.jsx`: expose `IslandParallax` in the current favourites fixture.
- `tests/parallaxSceneMath.test.mjs`: pure unit tests for the scene contract.

## Scene Contract

Each scene has this shape:

```js
{
  backgroundColor: '#03142f',
  layers: [
    {
      id: 'unique-layer-id',
      source: require('./asset.png'),
      depth: 0.25,
      resizeMode: 'cover',
      layout: {
        widthScale: 1.16,
        heightScale: 1.16
      },
      opacity: 1,
      drift: {
        axis: 'x',
        distance: 0.12,
        durationMs: 36000,
        reverse: true
      },
      pulse: {
        minOpacity: 0.38,
        maxOpacity: 0.72,
        durationMs: 4800
      }
    }
  ]
}
```

Only `id`, `source`, and `depth` are required. Defaults are `resizeMode: "cover"`, `layout.widthScale: 1.08`, `layout.heightScale: 1.08`, and `opacity: 1`. `drift` and `pulse` are independently optional.

Layer order is back-to-front array order. Layers that must remain aligned, such as near islands and their glow mask, use identical `depth` and `layout` values.

---

### Task 1: Lock the scene contract behind pure tests

**Files:**
- Create: `components/ParallaxLayers/sceneMath.js`
- Create: `tests/parallaxSceneMath.test.mjs`

**Interfaces:**
- Produces: `validateScene(scene): true`
- Produces: `getLayerFrame(layer, viewport): { width, height, left, top }`
- Produces: `getParallaxOffset(tilt, depth, maxOffset): number`

- [ ] **Step 1: Write failing tests for valid and invalid scene definitions**

Create `tests/parallaxSceneMath.test.mjs`:

```js
import assert from 'node:assert/strict';
import test from 'node:test';

import {
  getLayerFrame,
  getParallaxOffset,
  validateScene
} from '../components/ParallaxLayers/sceneMath.js';

test('validates a scene with static and animated layers', () => {
  const scene = {
    backgroundColor: '#03142f',
    layers: [
      { id: 'ocean', source: 1, depth: 0.05 },
      {
        id: 'mist',
        source: { uri: 'https://example.com/mist.png' },
        depth: 0.3,
        drift: {
          axis: 'x',
          distance: 0.12,
          durationMs: 36000,
          reverse: true
        }
      },
      {
        id: 'glow',
        source: 2,
        depth: 0.55,
        pulse: {
          minOpacity: 0.38,
          maxOpacity: 0.72,
          durationMs: 4800
        }
      }
    ]
  };

  assert.equal(validateScene(scene), true);
});

test('rejects duplicate layer ids', () => {
  assert.throws(
    () =>
      validateScene({
        layers: [
          { id: 'islands', source: 1, depth: 0.3 },
          { id: 'islands', source: 2, depth: 0.5 }
        ]
      }),
    /unique/i
  );
});

test('rejects out-of-range depth', () => {
  assert.throws(
    () =>
      validateScene({
        layers: [{ id: 'islands', source: 1, depth: 1.2 }]
      }),
    /depth/i
  );
});

test('centres an oversized layer around the viewport', () => {
  assert.deepEqual(
    getLayerFrame(
      {
        layout: {
          widthScale: 1.2,
          heightScale: 1.1
        }
      },
      { width: 1000, height: 2000 }
    ),
    {
      width: 1200,
      height: 2200,
      left: -100,
      top: -100
    }
  );
});

test('uses the same offset for layers sharing a depth', () => {
  assert.equal(getParallaxOffset(0.5, 0.4, 80), 16);
  assert.equal(getParallaxOffset(-2, 0.4, 80), -32);
});
```

- [ ] **Step 2: Run the tests and verify the new module is missing**

Run:

```bash
npm test
```

Expected: `parallaxSceneMath.test.mjs` fails because `sceneMath.js` does not exist.

- [ ] **Step 3: Implement pure scene validation and calculations**

Create `components/ParallaxLayers/sceneMath.js`:

```js
export const DEFAULT_LAYOUT = Object.freeze({
  widthScale: 1.08,
  heightScale: 1.08
});

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function assertPositive(value, field) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new TypeError(`${field} must be a positive number`);
  }
}

export function validateScene(scene) {
  if (!scene || !Array.isArray(scene.layers) || scene.layers.length === 0) {
    throw new TypeError('A parallax scene requires at least one layer');
  }

  const ids = new Set();

  for (const layer of scene.layers) {
    if (!layer.id || ids.has(layer.id)) {
      throw new TypeError('Layer ids must be present and unique');
    }
    ids.add(layer.id);

    if (layer.source == null) {
      throw new TypeError(`${layer.id}.source is required`);
    }
    if (!Number.isFinite(layer.depth) || layer.depth < 0 || layer.depth > 1) {
      throw new TypeError(`${layer.id}.depth must be between 0 and 1`);
    }

    if (layer.layout) {
      assertPositive(
        layer.layout.widthScale ?? DEFAULT_LAYOUT.widthScale,
        `${layer.id}.layout.widthScale`
      );
      assertPositive(
        layer.layout.heightScale ?? DEFAULT_LAYOUT.heightScale,
        `${layer.id}.layout.heightScale`
      );
    }

    if (layer.drift) {
      if (!['x', 'y'].includes(layer.drift.axis)) {
        throw new TypeError(`${layer.id}.drift.axis must be x or y`);
      }
      assertPositive(layer.drift.distance, `${layer.id}.drift.distance`);
      assertPositive(layer.drift.durationMs, `${layer.id}.drift.durationMs`);
    }

    if (layer.pulse) {
      const { minOpacity, maxOpacity, durationMs } = layer.pulse;
      if (
        !Number.isFinite(minOpacity) ||
        !Number.isFinite(maxOpacity) ||
        minOpacity < 0 ||
        maxOpacity > 1 ||
        minOpacity >= maxOpacity
      ) {
        throw new TypeError(`${layer.id}.pulse opacity range is invalid`);
      }
      assertPositive(durationMs, `${layer.id}.pulse.durationMs`);
    }
  }

  return true;
}

export function getLayerFrame(layer, viewport) {
  const widthScale =
    layer.layout?.widthScale ?? DEFAULT_LAYOUT.widthScale;
  const heightScale =
    layer.layout?.heightScale ?? DEFAULT_LAYOUT.heightScale;
  const width = viewport.width * widthScale;
  const height = viewport.height * heightScale;

  return {
    width,
    height,
    left: (viewport.width - width) / 2,
    top: (viewport.height - height) / 2
  };
}

export function getParallaxOffset(tilt, depth, maxOffset) {
  return clamp(tilt, -1, 1) * depth * maxOffset;
}
```

- [ ] **Step 4: Run the tests**

Run:

```bash
npm test
```

Expected: all existing tests and all five scene-math tests pass.

- [ ] **Step 5: Commit the scene contract**

```bash
git add components/ParallaxLayers/sceneMath.js tests/parallaxSceneMath.test.mjs
git commit -m "test: define parallax scene contract"
```

---

### Task 2: Move tilt updates off React render state

**Files:**
- Modify: `hooks/useDeviceTilt.js:1-79`

**Interfaces:**
- Produces: `useDeviceTilt(): { x: SharedValue<number>, y: SharedValue<number> }`
- Consumes: Expo `Accelerometer` and `DeviceMotion`

- [ ] **Step 1: Replace React state with Reanimated shared values**

Preserve the existing permission checks, neutral calibration, smoothing constants, and cleanup. Replace `useState` with `useSharedValue` and return stable shared values:

```js
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

export default function useDeviceTilt() {
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

      Accelerometer.setUpdateInterval(16);
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

        tiltX.value = smoothRef.current.x;
        tiltY.value = smoothRef.current.y;
      });
    };

    start();

    return () => {
      active = false;
      subscription?.remove();
      tiltX.value = 0;
      tiltY.value = 0;
    };
  }, [tiltX, tiltY]);

  return { x: tiltX, y: tiltY };
}
```

- [ ] **Step 2: Run static verification**

Run:

```bash
npx eslint hooks/useDeviceTilt.js
npm test
```

Expected: ESLint exits successfully and all tests pass.

- [ ] **Step 3: Commit shared-value tilt**

```bash
git add hooks/useDeviceTilt.js
git commit -m "perf: move parallax tilt to shared values"
```

---

### Task 3: Add one reusable animated layer renderer

**Files:**
- Create: `components/ParallaxLayers/AnimatedParallaxLayer.jsx`
- Modify: `components/ParallaxLayers/index.jsx:1-112`

**Interfaces:**
- Consumes: `layer`, `layerIndex`, `tilt`, `viewport`, and `maxOffset`
- Produces: one non-interactive `Animated.Image`
- `ParallaxLayers` remains the public component and continues accepting `layers`

- [ ] **Step 1: Implement `AnimatedParallaxLayer`**

Create `components/ParallaxLayers/AnimatedParallaxLayer.jsx`:

```jsx
import { useEffect } from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';

import { getLayerFrame } from './sceneMath';

export default function AnimatedParallaxLayer({
  layer,
  layerIndex,
  tilt,
  viewport,
  maxOffset
}) {
  const driftProgress = useSharedValue(-1);
  const pulseProgress = useSharedValue(0);
  const frame = getLayerFrame(layer, viewport);

  useEffect(() => {
    if (!layer.drift) {
      return undefined;
    }

    driftProgress.value = -1;
    driftProgress.value = withRepeat(
      withTiming(1, {
        duration: layer.drift.durationMs,
        easing: Easing.linear
      }),
      -1,
      layer.drift.reverse
    );

    return () => cancelAnimation(driftProgress);
  }, [
    driftProgress,
    layer.drift?.durationMs,
    layer.drift?.reverse
  ]);

  useEffect(() => {
    if (!layer.pulse) {
      return undefined;
    }

    pulseProgress.value = 0;
    pulseProgress.value = withRepeat(
      withTiming(1, {
        duration: layer.pulse.durationMs,
        easing: Easing.inOut(Easing.ease)
      }),
      -1,
      true
    );

    return () => cancelAnimation(pulseProgress);
  }, [layer.pulse?.durationMs, pulseProgress]);

  const animatedStyle = useAnimatedStyle(() => {
    const parallaxX = tilt.x.value * maxOffset * layer.depth;
    const parallaxY = tilt.y.value * maxOffset * layer.depth;
    const driftDistance =
      (layer.drift?.axis === 'x' ? viewport.width : viewport.height) *
      (layer.drift?.distance ?? 0);
    const driftX =
      layer.drift?.axis === 'x'
        ? driftProgress.value * driftDistance
        : 0;
    const driftY =
      layer.drift?.axis === 'y'
        ? driftProgress.value * driftDistance
        : 0;
    const opacity = layer.pulse
      ? interpolate(
          pulseProgress.value,
          [0, 1],
          [layer.pulse.minOpacity, layer.pulse.maxOpacity]
        )
      : (layer.opacity ?? 1);

    return {
      opacity,
      transform: [
        { translateX: parallaxX + driftX },
        { translateY: parallaxY + driftY }
      ]
    };
  });

  return (
    <Animated.Image
      pointerEvents="none"
      source={layer.source}
      resizeMode={layer.resizeMode ?? 'cover'}
      style={[
        frame,
        {
          position: 'absolute',
          zIndex: layerIndex + 1,
          elevation: layerIndex + 1
        },
        animatedStyle
      ]}
    />
  );
}
```

- [ ] **Step 2: Reduce `ParallaxLayers` to scene coordination**

Replace `components/ParallaxLayers/index.jsx` with:

```jsx
import { useMemo } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';

import useDeviceTilt from '../../hooks/useDeviceTilt';
import AnimatedParallaxLayer from './AnimatedParallaxLayer';
import { validateScene } from './sceneMath';

export default function ParallaxLayers({
  layers,
  backgroundColor = '#000'
}) {
  const { width, height } = useWindowDimensions();
  const tilt = useDeviceTilt();
  const viewport = useMemo(() => ({ width, height }), [height, width]);
  const maxOffset = Math.min(width, height) * 0.08;

  useMemo(() => validateScene({ layers }), [layers]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {layers.map((layer, index) => (
        <AnimatedParallaxLayer
          key={layer.id}
          layer={layer}
          layerIndex={index}
          tilt={tilt}
          viewport={viewport}
          maxOffset={maxOffset}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden'
  }
});
```

- [ ] **Step 3: Verify the renderer**

Run:

```bash
npx eslint components/ParallaxLayers
npm test
```

Expected: ESLint exits successfully and all tests pass.

- [ ] **Step 4: Commit the renderer**

```bash
git add components/ParallaxLayers
git commit -m "feat: support ambient parallax layer animation"
```

---

### Task 4: Make parallax skins config-driven

**Files:**
- Create: `skins/parallax/scenes.js`
- Create: `skins/parallax/ParallaxSkin.jsx`
- Modify: `screens/InGame/Skin.jsx:1-27`
- Delete: `skins/parallax/ParallaxTestSkin.jsx`

**Interfaces:**
- Produces: `getParallaxScene(skinID): Scene`
- Produces: `ParallaxSkin({ skinID, lives, setLives })`
- Consumes: the same life-counter props currently used by `ParallaxTestSkin`

- [ ] **Step 1: Move the current test scene into a registry**

Create `skins/parallax/scenes.js` with the current test scene:

```js
import mountainImage from '../Basic/Mountain/Mountain.png';
import counterImage from '../../images/Counter.png';
import frameImage from '../../images/frame4.png';

const SCENES = {
  ParallaxTest: {
    backgroundColor: '#000000',
    layers: [
      {
        id: 'mountain',
        source: mountainImage,
        depth: 0.15,
        layout: { widthScale: 1.08, heightScale: 1.08 }
      },
      {
        id: 'frame',
        source: frameImage,
        depth: 0.35,
        resizeMode: 'stretch',
        layout: { widthScale: 1.08, heightScale: 1.08 }
      },
      {
        id: 'counter',
        source: counterImage,
        depth: 0.6,
        resizeMode: 'contain',
        layout: { widthScale: 0.42, heightScale: 0.42 }
      }
    ]
  }
};

export function getParallaxScene(skinID) {
  const scene = SCENES[skinID];
  if (!scene) {
    throw new Error(`Unknown parallax scene: ${skinID}`);
  }
  return scene;
}
```

- [ ] **Step 2: Create the generic skin composition**

Create `skins/parallax/ParallaxSkin.jsx`:

```jsx
import { StyleSheet, View } from 'react-native';

import LifeCounter from '../../components/LifeCounter';
import ParallaxLayers from '../../components/ParallaxLayers';
import { getSkinData } from '../../services/getSkinInfo';
import { getParallaxScene } from './scenes';

export default function ParallaxSkin({ skinID, lives, setLives }) {
  const { player1Life } = lives;
  const { setPlayer1Life } = setLives;
  const { textColour } = getSkinData(skinID);
  const scene = getParallaxScene(skinID);

  return (
    <View style={styles.root}>
      <ParallaxLayers
        layers={scene.layers}
        backgroundColor={scene.backgroundColor}
      />
      <View style={styles.counterLayer}>
        <LifeCounter
          life={player1Life}
          setLife={setPlayer1Life}
          textColour={textColour}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  counterLayer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
```

- [ ] **Step 3: Route parallax metadata to the generic skin**

In `screens/InGame/Skin.jsx`, replace the `ParallaxTestSkin` import with `ParallaxSkin` and render it for every `skinType === "parallax"` entry.

- [ ] **Step 4: Remove the superseded test component**

Delete `skins/parallax/ParallaxTestSkin.jsx` after the registered test scene is visually equivalent.

- [ ] **Step 5: Verify the migration**

Run:

```bash
npx eslint skins/parallax screens/InGame/Skin.jsx
npm test
```

Expected: ESLint exits successfully and all tests pass. On device, `ParallaxTest` still opens and responds to tilt.

- [ ] **Step 6: Commit the generic skin architecture**

```bash
git add skins/parallax screens/InGame/Skin.jsx
git commit -m "refactor: drive parallax skins from scene configs"
```

---

### Task 5: Add the island scene when assets arrive

**Files:**
- Create: `skins/parallax/IslandParallax/assets/ocean.png`
- Create: `skins/parallax/IslandParallax/assets/islands-far.png`
- Create: `skins/parallax/IslandParallax/assets/islands-near.png`
- Create: `skins/parallax/IslandParallax/assets/mist.png`
- Create: `skins/parallax/IslandParallax/assets/glow.png`
- Create: `skins/parallax/IslandParallax/mini.png`
- Create: `skins/parallax/IslandParallax/data.json`
- Modify: `skins/parallax/scenes.js`
- Modify: `services/getSkinInfo.jsx:2-76`
- Modify: `screens/SelectSkin/index.jsx:27-39`

**Interfaces:**
- Produces: registered skin id `IslandParallax`
- Consumes: the exact five full-resolution assets and one thumbnail listed above

- [ ] **Step 1: Validate the delivered artwork before importing it**

Confirm:

- All full scene assets use the same 9:16 master composition and pixel dimensions, except `mist.png`, which may be wider.
- `ocean.png` is opaque and covers the entire canvas.
- Island and glow images have transparent backgrounds.
- `glow.png` aligns exactly with `islands-near.png`.
- `mist.png` has feathered transparent edges and enough horizontal overscan for a 12% drift.
- `mini.png` is suitable for the existing skin carousel.

- [ ] **Step 2: Add skin metadata**

Create `skins/parallax/IslandParallax/data.json`:

```json
{
  "id": "IslandParallax",
  "title": "Azure Isles",
  "numPlayers": 1,
  "skinType": "parallax",
  "tags": ["island", "blue", "parallax", "fantasy"],
  "textColour": "#dff8ffff"
}
```

- [ ] **Step 3: Register the scene**

Add `IslandParallax` to `SCENES` in this exact back-to-front order:

```js
IslandParallax: {
  backgroundColor: '#03142f',
  layers: [
    {
      id: 'ocean',
      source: require('./IslandParallax/assets/ocean.png'),
      depth: 0.04,
      layout: { widthScale: 1.1, heightScale: 1.1 }
    },
    {
      id: 'islands-far',
      source: require('./IslandParallax/assets/islands-far.png'),
      depth: 0.18,
      layout: { widthScale: 1.12, heightScale: 1.12 }
    },
    {
      id: 'mist',
      source: require('./IslandParallax/assets/mist.png'),
      depth: 0.3,
      layout: { widthScale: 1.35, heightScale: 1.12 },
      opacity: 0.42,
      drift: {
        axis: 'x',
        distance: 0.12,
        durationMs: 36000,
        reverse: true
      }
    },
    {
      id: 'islands-near',
      source: require('./IslandParallax/assets/islands-near.png'),
      depth: 0.48,
      layout: { widthScale: 1.16, heightScale: 1.16 }
    },
    {
      id: 'island-glow',
      source: require('./IslandParallax/assets/glow.png'),
      depth: 0.48,
      layout: { widthScale: 1.16, heightScale: 1.16 },
      pulse: {
        minOpacity: 0.38,
        maxOpacity: 0.72,
        durationMs: 4800
      }
    }
  ]
}
```

- [ ] **Step 4: Register metadata and thumbnail**

Add `IslandParallax` to both maps in `services/getSkinInfo.jsx`:

```js
IslandParallax: require('../skins/parallax/IslandParallax/mini.png')
```

```js
IslandParallax: require('../skins/parallax/IslandParallax/data.json')
```

- [ ] **Step 5: Expose the skin in the current carousel fixture**

Add `"IslandParallax"` immediately before `"ParallaxTest"` in the favourites array in `screens/SelectSkin/index.jsx`.

- [ ] **Step 6: Run automated verification**

Run:

```bash
npx eslint skins/parallax services/getSkinInfo.jsx screens/SelectSkin/index.jsx
npm test
npx expo export --platform android
```

Expected: lint and tests pass, and Expo completes the Android export without missing-asset errors.

- [ ] **Step 7: Commit the island skin**

```bash
git add skins/parallax/IslandParallax skins/parallax/scenes.js services/getSkinInfo.jsx screens/SelectSkin/index.jsx
git commit -m "feat: add animated Azure Isles skin"
```

---

### Task 6: Device verification and tuning

**Files:**
- Modify if measurements require it: `skins/parallax/scenes.js`

**Interfaces:**
- Consumes: the completed `IslandParallax` scene
- Produces: tuned scene constants only; no renderer-specific special cases

- [ ] **Step 1: Verify composition on a physical phone**

Check the following in portrait orientation:

- No black or transparent edges appear at maximum tilt.
- The far islands move less than the near islands.
- Mist movement is slow, continuous, and does not expose an edge.
- Near islands and their glow remain pixel-aligned throughout tilt.
- The glow pulse is visible but does not reduce text readability.
- The central life counter remains unobstructed and fully interactive.

- [ ] **Step 2: Verify graceful sensor fallback**

Deny motion permission on iOS, or test on a simulator without accelerometer data.

Expected: all layers remain centred, mist continues drifting, glow continues pulsing, and the life counter remains usable.

- [ ] **Step 3: Check animation performance**

Use the React Native performance monitor on a representative Android device for at least 60 seconds.

Expected:

- No sustained frame-rate drop while idle or tilting.
- No React render loop caused by accelerometer updates.
- No increasing memory use from repeated animations.

- [ ] **Step 4: Tune only scene data**

If an artistic adjustment is necessary, change `depth`, `layout`, `opacity`, `drift`, or `pulse` values in `skins/parallax/scenes.js`. Do not add island-specific branches to `AnimatedParallaxLayer`.

- [ ] **Step 5: Run final verification**

Run:

```bash
npx eslint components/ParallaxLayers hooks/useDeviceTilt.js skins/parallax screens/InGame/Skin.jsx services/getSkinInfo.jsx
npm test
npx expo export --platform android
git status --short
```

Expected: lint, tests, and export pass. Git status shows only the intended plan implementation changes.

- [ ] **Step 6: Commit any device-tuning changes**

If scene constants changed:

```bash
git add skins/parallax/scenes.js
git commit -m "fix: tune Azure Isles motion"
```

