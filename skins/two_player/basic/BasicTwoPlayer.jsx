import { ImageBackground, Image, Button, View } from 'react-native';

// import Counter from '../components/CrossCounter';
import DragQueen from '../../../components/DragQueen';
import { getSkinData } from '../../../services/getSkinInfo';

import React from 'react';

export default function BasicTwoPlayer({
  skinID = 'Default',
  lives,
  setLives
}) {
  const imgMap = {
    Waves: require(`./Waves/Waves.png`),
    Default: require(`./Waves/Waves.png`)
  };

  const { player1Life, player2Life } = lives;
  const { setPlayer1Life, setPlayer2Life } = setLives;

  const data = getSkinData(skinID);
  const img = imgMap[skinID];
  const textColour = data.textColour;

  return (
    <ImageBackground
      source={img}
      style={{
        width: '100%',
        height: '100%',
        flex: 1
        // flex: 'auto'
        // resizeMode: 'cover'
        // resizeMode: 'cover' // Adjust this as needed
      }}>
      <View style={{ flex: 1 }}>
        <DragQueen
          life={player1Life}
          setLife={setPlayer1Life}
          textColour={textColour}
          rotation="180deg"
        />
      </View>
      <View style={{ flex: 1 }}>
        <DragQueen
          life={player2Life}
          setLife={setPlayer2Life}
          textColour={textColour}
        />
      </View>
    </ImageBackground>
  );
}
