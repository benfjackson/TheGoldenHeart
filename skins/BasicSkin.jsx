import { ImageBackground, Image } from 'react-native';

import Counter from '../components/CrossCounter';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';

export default function BasicSkin({ backGround }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5
    },
    modal: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    blurView: {
      borderRadius: 10,
      padding: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    menuItem: {
      fontSize: 18,
      marginBottom: 10
    }
  });

  const img = backGround;
  return (
    <>
      <Modal
        isVisible={isMenuVisible}
        onBackdropPress={toggleMenu}
        backdropOpacity={0}
        style={styles.modal}>
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="white">
          {/* Add your mini menu items here */}
          <Text style={styles.menuItem}>Menu Item 1</Text>
          <Text style={styles.menuItem}>Menu Item 2</Text>
          <Text style={styles.menuItem}>Menu Item 3</Text>
        </BlurView>
      </Modal>
      <ImageBackground source={img} style={{ width: '100%', height: '100%' }}>
        {/* <TouchableOpacity onPress={toggleMenu} style={styles.button}>
          <Text>Show Mini Menu</Text>
        </TouchableOpacity> */}
        <Counter />
      </ImageBackground>
    </>
  );
}
