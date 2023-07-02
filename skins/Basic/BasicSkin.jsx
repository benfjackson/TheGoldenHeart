import { ImageBackground, Image, Button } from 'react-native';

// import Counter from '../components/CrossCounter';
import DragQueen from '../../components/DragQueen';
import { getSkinData } from '../../services/getSkinInfo';

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
    RedSkullVampire: require(`./RedSkullVampire/RedSkullVampire.png`),
    Swamp: require(`./Swamp/Swamp.png`),
    Island: require(`./Island/Island.png`),
    Plains: require(`./Plains/Plains.png`),
    Mountain: require(`./Mountain/Mountain.png`),
    Forest: require(`./Forest/Forest.png`)
  };

  const data = getSkinData(skinID);
  const img = imgMap[skinID];
  const textColour = data.textColour;

  return (
    <ImageBackground
      source={img}
      style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
      <DragQueen life={life} setLife={setLife} textColour={textColour} />
    </ImageBackground>
  );
}
