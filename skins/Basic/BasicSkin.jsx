import { ImageBackground, Image, Button } from 'react-native';

// import Counter from '../components/CrossCounter';
import DragQueen from '../../components/DragQueen';
import { getSkinData } from '../../services/getSkinInfo';

import React, { useState } from 'react';
import ScreenFrame from '../../components/ScreenFrame';

export default function BasicSkin({ skinID = 'Default', lives, setLives }) {
  const imgMap = {
    Devil: require(`./Devil/Devil.png`), //Devil,
    NobleVampire: require(`./NobleVampire/NobleVampire.png`),
    GloriousElk: require(`./Elk/Elk.png`),
    Kraken: require(`./Kraken/Kraken.png`),
    LightningDragon: require(`./LightningDragon/LightningDragon.png`),
    Angel: require(`./Angel/Angel.png`),
    GreenVampire: require(`./GreenVampire/GreenVampire.png`),
    Druid: require(`./Druid/Druid.png`),
    HallOfSpirits: require(`./HallOfSpirits/HallOfSpirits.png`),
    RedSkullVampire: require(`./RedSkullVampire/RedSkullVampire.png`),
    Swamp: require(`./Swamp/Swamp.png`),
    Island: require(`./Island/Island.png`),
    Plains: require(`./Plains/Plains.png`),
    Mountain: require(`./Mountain/Mountain.png`),
    Forest: require(`./Forest/image.png`),
    DeathAngel: require(`./DeathAngel/DeathAngel.png`)
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
        // width: '100%',
        // height: '100%',
        //ITS THIS
        // width: 650,
        width: '100%',
        height: '100%'
        // flex: 'auto'
        // resizeMode: 'cover'
        // resizeMode: 'cover' // Adjust this as needed
      }}>
      <ScreenFrame>
        <DragQueen
          life={player1Life}
          setLife={setPlayer1Life}
          textColour={textColour}
        />
      </ScreenFrame>
    </ImageBackground>
  );
}
