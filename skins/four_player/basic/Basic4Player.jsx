import { ImageBackground, Image, Button, View } from 'react-native';
import { getSkinData } from '../../services/getSkinInfo';
import Tapper from '../../../components/Tapper';

import React from 'react';

export default function Basic4Player({ skinID = 'Default', lives, setLives }) {
  const imgMap = {
    TheIsland: require(`./TheIsland/TheIsland.png`)
  };

  const { player1Life, player2Life, player3Life, player4Life } = lives;
  const { setPlayer1Life, setPlayer2Life, setPlayer3Life, setPlayer4Life } =
    setLives;

  // const data = getSkinData(skinID);
  const img = imgMap[skinID];
  // const textColour = data.textColour;

  return (
    <ImageBackground
      source={img}
      style={{
        width: '100%',
        height: '100%'
      }}>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Tapper life={player1Life} setLife={setPlayer1Life} />
          <Tapper life={player2Life} setLife={setPlayer2Life} />
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Tapper life={player3Life} setLife={setPlayer3Life} />
          <Tapper life={player4Life} setLife={setPlayer4Life} />
        </View>
      </View>
    </ImageBackground>
  );
}
