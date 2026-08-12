# Holographic Knight POC Design

## Goal

Add a proof-of-concept skin that makes the supplied knight artwork feel like a holographic trading card. Device tilt moves a spectral reflection, white glare, foil grain, and sparse glints across the knight silhouette. The implementation should establish a reusable holographic surface for future skins without changing the existing parallax renderer.

## Scope

The POC uses:

- `sparkles/knight.png` as the full-screen base artwork.
- `sparkles/knight_alpha_mask.png` as an alpha mask for the entire knight silhouette.
- `sparkles/dense_sparkles_alpha.png` as the fine foil grain.
- `sparkles/sparse_glint_alpha.png` as the brighter glint layer.

The grey RGB value in the mask is intentional and safe because the renderer will explicitly use `maskType="alpha"`. The mask covers the whole knight silhouette, including cloth and underlayers; precise armour-only segmentation is outside this POC.

The POC does not add positional parallax, a graphics dependency, true colour-dodge blending, texture authoring tools, or animated image sequences. `crystalline_foil` and `fine_diffraction` remain available for later experiments but are not rendered initially.

## Architecture

Create a reusable `HolographicSurface` component independent of `ParallaxLayers`. It owns one `useDeviceTilt` subscription and renders four aligned full-screen layers:

1. The base image.
2. A masked procedural SVG containing a broad spectral gradient.
3. A masked white glare and the dense sparkle texture.
4. A masked sparse-glint texture.

All effect layers use the same image frame and resize mode as the base, so the mask remains aligned on different 9:16 screens. The SVG mask uses the supplied PNG's alpha channel rather than its luminance.

The component accepts image sources and a small effect configuration:

- `baseSource`
- `maskSource`
- `denseSparkleSource`
- `glintSource`
- `intensity`
- `palette`
- `children` for fixed UI rendered above the effect

The first consumer is a `HolographicKnight` skin. Later skins can reuse the component with different artwork, masks, palettes, and intensities.

## Tilt-to-Light Behaviour

The existing smoothed, clamped `[-1, 1]` tilt values remain the sole motion input. Derived effect values are calculated on the Reanimated UI thread:

- Horizontal and vertical tilt move the spectral band across and slightly beyond the viewport.
- The gradient angle changes modestly with horizontal tilt so it reads as reflected light rather than a translated rainbow.
- A broad radial white highlight follows the same implied light position.
- Dense sparkle texture translates by a smaller amount than the gradient and remains at low opacity.
- Sparse glints use a sharper, non-linear opacity response to the combined tilt position, creating flashes as the phone crosses reflective angles.

The base artwork does not translate. This distinguishes the effect from parallax: the card remains fixed while its apparent reflected light moves.

At neutral tilt, the spectrum and glare remain faintly visible rather than disappearing. If motion permission or sensor access is unavailable, the component renders this neutral state without errors.

## Composition and Interaction

The life counter is passed as `children` and remains fixed above all visual layers. Holographic layers use `pointerEvents="none"` so they cannot intercept life-counter interaction.

The initial visual balance should be restrained:

- The artwork remains readable at every angle.
- The spectral overlay tints rather than obscures the knight.
- Dense sparkles provide texture instead of appearing as a star field.
- Sparse glints are occasional and brighter but never cover the life counter.

Normal alpha compositing is acceptable for the POC. A future Skia experiment may evaluate screen or colour-dodge blending if the SVG result lacks enough metallic depth.

## Data Flow

`HolographicKnight` supplies assets and configuration to `HolographicSurface`. `HolographicSurface` reads shared tilt values, derives light position and glint intensity in animated styles or props, and applies them directly to its SVG and image layers. No React state updates occur for sensor events or animation frames.

## Validation and Error Handling

Development-time validation should reject missing required sources and clamp configurable intensity to a safe range. Asset dimensions do not need to match the physical viewport, but the base and mask must share an aspect ratio and layout transform.

Unavailable sensor permission is a supported fallback, not an error. Invalid skin registration should continue to use the project's existing unknown-skin error behaviour.

## Verification

Pure tests cover:

- Clamping and mapping tilt into light coordinates.
- Neutral light placement.
- Spectral and glare positions at tilt extremes.
- Sparse-glint opacity remaining within its configured bounds.
- Intensity clamping.

Manual verification on iOS and Android covers:

- The base and mask remain aligned in portrait layouts.
- Reflections move smoothly in both axes.
- Glints respond while tilting and settle at neutral.
- No black texture backgrounds are visible.
- The life counter remains fixed, legible, and interactive.
- Denied motion permission produces a stable neutral appearance.

## Success Criteria

The knight reads as a single holographic card surface when the phone tilts; reflected colour and highlights move while the artwork and controls remain fixed. The effect runs without per-frame React renders or new dependencies and can be reused by another skin through asset and palette configuration.
