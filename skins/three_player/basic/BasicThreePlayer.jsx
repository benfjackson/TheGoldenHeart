import { ImageBackground, View } from 'react-native';

import LifeCounter from '../../../components/LifeCounter';
import { getSkinData } from '../../../services/getSkinInfo';

import React from 'react';

export default function BasicThreePlayer({
  skinID = 'Default',
  lives,
  setLives
}) {
  const imgMap = {
    ThreeRings: require(`./ThreeRings.png`),
    Default: require(`./ThreeRings.png`)
  };

  const { player1Life, player2Life, player3Life } = lives;
  const { setPlayer1Life, setPlayer2Life, setPlayer3Life } = setLives;

  const data = getSkinData(skinID);
  const img = imgMap[skinID];
  const textColour1 = data.textColour1;
  const textColour2 = data.textColour2;
  const textColour3 = data.textColour3;

  return (
    <ImageBackground
      source={img}
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column'
      }}>
      <View style={{ flex: 1 }} pointerEvents="box-none">
        <LifeCounter
          life={player1Life}
          setLife={setPlayer1Life}
          textColour={textColour1}
          axis="horizontal"
          layout="rotated-column"
        />
      </View>
      <View style={{ flex: 1 }} pointerEvents="box-none">
        <LifeCounter
          life={player2Life}
          setLife={setPlayer2Life}
          textColour={textColour2}
          axis="horizontal"
          layout="rotated-column"
        />
      </View>
      <View style={{ flex: 1 }} pointerEvents="box-none">
        <LifeCounter
          life={player3Life}
          setLife={setPlayer3Life}
          textColour={textColour3}
          axis="horizontal"
          layout="rotated-column"
        />
      </View>
    </ImageBackground>
  );
}
