import { ImageBackground, Image, Button } from 'react-native';

// import Counter from '../components/CrossCounter';
import DragQueen from '../../components/DragQueen';
import { getSkinData } from '../../services/getSkinInfo';

import React from 'react';

export default function Basic2Player({ skinID = 'Default', lives, setLives }) {
  const imgMap = {
    Rivers: require(`./Rivers/Rivers.png`)
  };

  const { player1Life } = lives;
  const { setPlayer1Life } = setLives;

  const data = getSkinData(skinID);
  const img = imgMap[skinID];
  const textColour = data.textColour;

  return (
    <ImageBackground
      source={img}
      style={{
        width: '100%',
        height: '100%'
      }}>
      <DragQueen
        life={player1Life}
        setLife={setPlayer1Life}
        textColour={textColour}
      />
    </ImageBackground>
  );
}
