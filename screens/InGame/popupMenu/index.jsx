import Modal from 'react-native-modal';

import Main from './Main';
import History from './History';
import CountersSelection from './CounterSelection';

import { Text, View, Pressable, ImageBackground } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Game from './Game';

export default function PopupMenu({
  isOpen,
  setIsOpen,
  numPlayers,
  histories,
  counterControl,
  resetGame,
  ...props
}) {
  const bg = require('./popup.png');
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
      <View>
        <ImageBackground
          imageStyle={{
            resizeMode: 'contain'
          }}
          source={bg}>
          <View
            style={{
              // flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              width: '70%',
              height: 450,

              marginLeft: '15%',
              marginRight: '15%',
              marginVertical: '10%'
              // marginTop: '25%'
            }}>
            {menuState === 'main' && (
              <Main
                setMenuState={setMenuState}
                setPopupMenuIsOpen={setIsOpen}
                resetGame={resetGame}
              />
            )}
            {menuState === 'counters' && (
              <CountersSelection
                setMenuState={setMenuState}
                counterControl={counterControl}
              />
            )}
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
}
