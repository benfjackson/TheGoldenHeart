import Main from './Main';
import CountersSelection from './CounterSelection';

import {
  Modal,
  View,
  Pressable,
  ImageBackground,
  StyleSheet
} from 'react-native';

import { useState } from 'react';

export default function PopupMenu({
  isOpen,
  setIsOpen,
  counterControl,
  resetGame
}) {
  const bg = require('./popup.png');
  const [menuState, setMenuState] = useState('main');

  const closeMenu = () => {
    setMenuState('main');
    setIsOpen(false);
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={closeMenu}>
      <Pressable style={styles.backdrop} onPress={closeMenu}>
        <Pressable style={styles.dialog} onPress={(event) => event.stopPropagation()}>
          <ImageBackground
            imageStyle={styles.popupImage}
            style={styles.popupBackground}
            source={bg}>
            <View style={styles.content}>
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
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center'
  },
  dialog: {
    flex: 1,
    justifyContent: 'center'
  },
  popupBackground: {
    width: '100%'
  },
  popupImage: {
    resizeMode: 'contain'
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '80%',
    height: 450,
    marginLeft: '10%',
    marginRight: '15%',
    marginVertical: '10%'
  }
});
