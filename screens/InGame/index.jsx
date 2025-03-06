//Has the menu, manages state for the counters and passes into the skin
//Manages having the guest

import PopupMenu from './popupMenu';
import Counters from './Counters';

import { useState, useEffect } from 'react';
import { View, Image, Pressable, Text } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import Skin from './Skin';

import useGameState from '../../hooks/useGameState';

export default function InGame({ route }) {
  useKeepAwake();

  const loadGameState = route.params?.loadGameState;
  const initialiseGameState = route.params?.initialiseGameState;

  const {
    lives,
    setLives,
    histories,
    counterControl,
    loadGame,
    // saveGame,
    resetGame,
    initialiseGame,

    numPlayers,
    skinID
  } = useGameState();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!loaded) {
    if (loadGameState) {
      console.log('LOADGAMESTATE received as');
      console.log(loadGameState);
      loadGame(loadGameState);
      setLoaded(true);
    } else if (initialiseGameState) {
      console.log('initialising game as');
      console.log(initialiseGameState);
      const { numPlayers, skinID, startingLife } = initialiseGameState;
      initialiseGame(numPlayers, skinID, startingLife);
      setLoaded(true);
    }
  }
  if (!loaded) return <></>;
  const menuButton = require('../../images/popupButton.png');

  return (
    <>
      <PopupMenu
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
        numPlayers={numPlayers}
        histories={histories}
        counterControl={counterControl}
        resetGame={resetGame}
      />
      <View
        style={{
          flex: 1,
          // width: '100%',
          // height: '10%'
          backgroundColor: 'black'
        }}>
        <Pressable
          style={{
            position: 'absolute',
            top: 40,
            left: 30,
            zIndex: 10
          }}
          onPress={() => setMenuOpen(true)}>
          <Image source={menuButton} style={{ width: 80, height: 80 }} />
        </Pressable>
        <Text
          style={{
            flex: 1,
            width: '100%',
            height: '100%'
          }}>
          <Skin skinID={skinID} lives={lives} setLives={setLives} />
        </Text>

        <Counters counterControl={counterControl} />

        {/* <View
          style={{
            position: 'absolute',
            bottom: 0,
            height: counterControl.counters.length > 0 ? '25%' : '0%',
            width: '100%',
            marginBottom: '-15%'
          }}> */}
        {/* </View> */}
      </View>
      {/* </View> */}
    </>
  );
}
