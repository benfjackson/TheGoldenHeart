import { ImageBackground, Image, Button, View, Text } from 'react-native';

// import Counter from '../components/CrossCounter';
import DragHold from '../../../components/DragHold';
import { getSkinData } from '../../../services/getSkinInfo';

import React from 'react';

export default function BasicFourPlayer({
  skinID = 'Default',
  lives,
  setLives
}) {
  const imgMap = {
    Waves4player: require(`./Waves/Waves.png`),
    Default: require(`./Waves/Waves.png`)
  };

  const { player1Life, player2Life, player3Life, player4Life } = lives;
  const { setPlayer1Life, setPlayer2Life, setPlayer3Life, setPlayer4Life } =
    setLives;

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
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <DragHold
            life={player1Life}
            setLife={setPlayer1Life}
            textColour={textColour}
            rotation="180deg"
          />
        </View>
        <View style={{ flex: 1 }}>
          <DragHold
            life={player2Life}
            setLife={setPlayer2Life}
            textColour={textColour}
            rotation="180deg"
          />
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <DragHold
            life={player3Life}
            setLife={setPlayer3Life}
            textColour={textColour}
          />
        </View>
        <View style={{ flex: 1 }}>
          <DragHold
            life={player4Life}
            setLife={setPlayer4Life}
            textColour={textColour}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
