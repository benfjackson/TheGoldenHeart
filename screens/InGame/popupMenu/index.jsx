import Modal from 'react-native-modal';

import Main from './Main';
import History from './History';
import CountersSelection from './CounterSelection';

import { Text, View, Pressable, ImageBackground } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function PopupMenu({ isOpen, setIsOpen, gameState, ...props }) {
  const bg = require('../../../images/UI/popup.png');
  const [menuState, setMenuState] = useState('main');

  return (
    <Modal
      style={{
        flex: 1
      }}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={1000}
      animationOutTiming={1000}
      isVisible={isOpen}
      onBackdropPress={() => {
        setMenuState('main');
        setIsOpen(false);
      }}
      {...props}>
      <ImageBackground
        imageStyle={{
          resizeMode: 'cover',
          // width: '100%',
          height: '100%'
        }}
        source={bg}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '70%',
            height: '70%',
            marginLeft: '15%',
            marginRight: '15%',
            marginTop: '25%'
          }}>
          {menuState === 'main' && (
            <Main
              gameState={gameState}
              setMenuState={setMenuState}
              setIsOpen={setIsOpen}
            />
          )}
          {menuState === 'history' && (
            <History setMenuState={setMenuState} gameState={gameState} />
          )}
          {menuState === 'counters' && (
            <CountersSelection
              setMenuState={setMenuState}
              gameState={gameState}
            />
          )}
        </View>
      </ImageBackground>
    </Modal>
  );
}
