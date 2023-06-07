import { ImageBackground, Image, Button } from 'react-native';

// import Counter from '../components/CrossCounter';
import DragFlag from '../../components/DragFlag';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

export default function BasicSkin({
  skinID = 'Default',
  life = 21,
  setLife = () => console.log('setLife not defined')
}) {
  console.log('BasicSkin', skinID);
  //, life, setLife
  // const [life, setLife] = useState(20);

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
  const img = imgMap[skinID];

  return (
    <ImageBackground
      source={img}
      style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
      <DragFlag life={life} setLife={setLife} />
    </ImageBackground>
  );
}
