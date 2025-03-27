import { ImageBackground, Image, Button, View, Text } from 'react-native';

// import Counter from '../components/CrossCounter';
import DragQueen from '../../../components/DragQueen';
import { getSkinData } from '../../../services/getSkinInfo';

import React from 'react';

export default function BasicFourPlayer({
  skinID = 'Default',
  lives,
  setLives
}) {
  const imgMap = {
    Waves4player: require(`./Waves/Waves.png`),
    Quadrants: require(`./Quadrants/Quadrants.png`),
    Serenity: require(`./Serenity/image.png`),
    Default: require(`./Waves/Waves.png`)
  };

  const { player1Life, player2Life, player3Life, player4Life } = lives;
  const { setPlayer1Life, setPlayer2Life, setPlayer3Life, setPlayer4Life } =
    setLives;

  const data = getSkinData(skinID);
  const img = imgMap[skinID];
  const textColour1 = data.textColour1;
  const textColour2 = data.textColour2;
  const textColour3 = data.textColour3;
  const textColour4 = data.textColour4;

  return (
    <ImageBackground
      source={img}
      style={{
        width: '100%',
        height: '100%',
        flex: 1
      }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <DragQueen
            life={player1Life}
            setLife={setPlayer1Life}
            textColour={textColour1}
            rotation="180deg"
          />
        </View>
        <View style={{ flex: 1 }}>
          <DragQueen
            life={player2Life}
            setLife={setPlayer2Life}
            textColour={textColour2}
            rotation="180deg"
          />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <DragQueen
            life={player3Life}
            setLife={setPlayer3Life}
            textColour={textColour3}
          />
        </View>
        <View style={{ flex: 1 }}>
          <DragQueen
            life={player4Life}
            setLife={setPlayer4Life}
            textColour={textColour4}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
