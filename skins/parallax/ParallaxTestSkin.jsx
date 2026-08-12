import { View, StyleSheet } from 'react-native';

import LifeCounter from '../../components/LifeCounter';
import ParallaxLayers from '../../components/ParallaxLayers';
import ScreenFrame from '../../components/ScreenFrame';
import { getSkinData } from '../../services/getSkinInfo';

// Back → front. `inset` shrinks each layer; `depth` controls parallax movement.
const TEST_LAYERS = [
  { color: '#0000ff', depth: 0.15, inset: 0 },
  { color: '#00ff00', depth: 0.35, inset: 0.14 },
  { color: '#ff0000', depth: 0.6, inset: 0.28 }
];

export default function ParallaxTestSkin({ skinID = 'ParallaxTest', lives, setLives }) {
  const { player1Life } = lives;
  const { setPlayer1Life } = setLives;
  const { textColour } = getSkinData(skinID);

  return (
    <View style={styles.root}>
      <ParallaxLayers layers={TEST_LAYERS} />
      <View style={styles.counterLayer}>
        <LifeCounter
          life={player1Life}
          setLife={setPlayer1Life}
          textColour={textColour}
        />
      </View>
      <View style={styles.frameLayer} pointerEvents="none">
        <ScreenFrame transparent />
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
  },
  frameLayer: {
    ...StyleSheet.absoluteFillObject
  }
});
