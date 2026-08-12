import { StyleSheet, View } from 'react-native';

import HolographicSurface from '../../components/HolographicSurface';
import LifeCounter from '../../components/LifeCounter';
import { getSkinData } from '../../services/getSkinInfo';
import { getHolographicConfig } from './configs';

export default function HolographicSkin({ skinID, lives, setLives }) {
  const { player1Life } = lives;
  const { setPlayer1Life } = setLives;
  const { textColour } = getSkinData(skinID);
  const config = getHolographicConfig(skinID);

  return (
    <HolographicSurface
      baseSource={config.baseSource}
      backgroundColor={config.backgroundColor}
      palette={config.palette}>
      <View style={styles.counterWrapper}>
        <LifeCounter
          life={player1Life}
          setLife={setPlayer1Life}
          textColour={textColour}
        />
      </View>
    </HolographicSurface>
  );
}

const styles = StyleSheet.create({
  counterWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%'
  }
});
