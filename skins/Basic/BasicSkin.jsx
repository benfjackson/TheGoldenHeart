import { ImageBackground, Image, Button } from 'react-native';

// import Counter from '../components/CrossCounter';
import DragQueen from '../../components/DragQueen';

import React, { useState } from 'react';

export default function BasicSkin({
  skinID = 'Default',
  life = 20,
  setLife = () => console.log('setLife not defined')
}) {
  const imgMap = {
    Devil: require(`./Devil/Devil.png`),
    NobleVampire: require(`./NobleVampire/NobleVampire.png`),
    GloriousElk: require(`./Elk/Elk.png`),
    Kraken: require(`./Kraken/Kraken.png`),
    LightningDragon: require(`./LightningDragon/LightningDragon.png`),
    Angel: require(`./Angel/Angel.png`),
    GreenVampire: require(`./GreenVampire/GreenVampire.png`),
    Druid: require(`./Druid/Druid.png`),
    HallOfSpirits: require(`./HallOfSpirits/HallOfSpirits.png`),
    RedSkullVampire: require(`./RedSkullVampire/RedSkullVampire.png`)
  };

  const textColourMap = {
    Devil: 'light',
    NobleVampire: 'light',
    GloriousElk: 'light',
    Kraken: 'light',
    LightningDragon: 'light',
    Angel: 'dark',
    GreenVampire: 'light',
    Druid: 'light',
    HallOfSpirits: 'light',
    RedSkullVampire: 'light'
  };

  const img = imgMap[skinID];
  const textColour = textColourMap[skinID];

  return (
    <ImageBackground
      source={img}
      style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
      <DragQueen life={life} setLife={setLife} textColour={textColour} />
    </ImageBackground>
  );
}
