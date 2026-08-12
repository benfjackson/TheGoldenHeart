import { useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import LifeCounter from '../../components/LifeCounter';
import ParallaxLayers from '../../components/ParallaxLayers';
import { getSkinData } from '../../services/getSkinInfo';
import {
  logParallaxCounterLayout,
  logParallaxMount,
  logParallaxStackSummary
} from '../../utils/parallaxDebug';
import { getParallaxScene } from './scenes';

export default function ParallaxSkin({ skinID, lives, setLives }) {
  const { player1Life } = lives;
  const { setPlayer1Life } = setLives;
  const { textColour } = getSkinData(skinID);
  const scene = getParallaxScene(skinID);
  const overlayLayoutRef = useRef(null);
  const counterLayoutRef = useRef(null);
  const viewportRef = useRef(null);
  const stackLoggedRef = useRef(false);

  useEffect(() => {
    stackLoggedRef.current = false;
    logParallaxMount(skinID, scene, player1Life, textColour);
  }, [player1Life, scene, skinID, textColour]);

  const maybeLogStackSummary = () => {
    if (
      stackLoggedRef.current ||
      !viewportRef.current ||
      !overlayLayoutRef.current ||
      !counterLayoutRef.current
    ) {
      return;
    }

    stackLoggedRef.current = true;
    logParallaxStackSummary({
      skinID,
      viewport: viewportRef.current,
      overlayLayout: overlayLayoutRef.current,
      counterLayout: counterLayoutRef.current,
      life: player1Life
    });
  };

  return (
    <ParallaxLayers
      layers={scene.layers}
      backgroundColor={scene.backgroundColor}
      onViewport={(viewport) => {
        viewportRef.current = viewport;
        maybeLogStackSummary();
      }}
      onOverlayLayout={(layout) => {
        overlayLayoutRef.current = layout;
        maybeLogStackSummary();
      }}
      overlay={
        <View
          style={styles.counterWrapper}
          onLayout={(event) => {
            const layout = event.nativeEvent.layout;
            counterLayoutRef.current = layout;
            logParallaxCounterLayout(layout, player1Life, textColour);
            maybeLogStackSummary();
          }}>
          <LifeCounter
            life={player1Life}
            setLife={setPlayer1Life}
            textColour={textColour}
          />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  counterWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%'
  }
});
