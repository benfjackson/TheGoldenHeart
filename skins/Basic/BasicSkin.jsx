import { ImageBackground } from 'react-native';

import LifeCounter from '../../components/LifeCounter';
import { getSkinData } from '../../services/getSkinInfo';

import React from 'react';
import ScreenFrame from '../../components/ScreenFrame';

export default function BasicSkin({ skinID = 'Default', lives, setLives }) {
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
        width: '100%',
        height: '100%'
      }}>
      <ScreenFrame>
        <LifeCounter
          life={player1Life}
          setLife={setPlayer1Life}
          textColour={textColour}
        />
      </ScreenFrame>
    </ImageBackground>
  );
}
