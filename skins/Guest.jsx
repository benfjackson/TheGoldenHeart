import { ImageBackground, Image, Button } from 'react-native';

// import Counter from '../components/CrossCounter';
import Tapper from '../components/Tapper';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

export default function GuestSkin({
  life = 20,
  setLife = () => console.log('setLife guest not defined in guest')
}) {
  //Black velvet
  const img = null;

  return (
    <ImageBackground
      source={img}
      style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
      <Tapper inverse life={life} setLife={setLife} />
    </ImageBackground>
  );
}
