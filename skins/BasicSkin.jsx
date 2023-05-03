import { ImageBackground, Image, Button } from 'react-native';

// import Counter from '../components/CrossCounter';
import DragFlag from '../components/DragFlag';

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';

export default function BasicSkin({ backGround }) {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const styles = StyleSheet.create({
    button: {
      padding: 10,
      marginTop: 20,
      borderRadius: 5
      //size
      // width: 5,
      // height: 5
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

  const navigate = useNavigation();

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
        {/** Button with transparent background that navigates back */}
        <TouchableOpacity
          onPress={() => navigate.goBack()}
          style={styles.button}>
          <Image
            source={require('../images/UI/BackButton.png')}
            style={{ width: 50, height: 50 }}
          />
        </TouchableOpacity>
        <DragFlag />
      </ImageBackground>
    </>
  );
}
