//Has the menu, manages state for the counters and passes into the skin
//Manages having the guest

import getSkin from './getSkin';
import GuestSkin from '../../skins/Guest';
import PopupMenu from './popupMenu';
import Counters from './Counters';

import { useState, useEffect } from 'react';
import { View, Image, Pressable } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';

import { saveGameState } from '../../services/appStorage';

export default function InGame({ route }) {
  useKeepAwake();

  const skinID = route.params?.skinID;
  const gameState = route.params?.gameState;
  const startingHealth = route.params?.gameState.startingHealth;

  const [menuOpen, setMenuOpen] = useState(false);
  const [guest, setGuest] = useState(gameState.guest || false);

  const [life, setLife] = useState(gameState.life);
  const [guestLife, setGuestLife] = useState(gameState.guestLife);
  const [history, setHistory] = useState(gameState.history || []);
  const [activeCounters, setActiveCounters] = useState(
    gameState.activeCounters || []
  );
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setHistory([...history, life]);
  }, [life]);

  useEffect(() => {
    saveGameState({
      life,
      history,
      guest,
      guestLife,
      activeCounters,
      skinID
    });
  }, [life, history, guest, guestLife, activeCounters]);

  const Skin = getSkin(skinID).default;

  const menuButton = require('../../images/UI/popupButton.png');

  return (
    <>
      <PopupMenu
        isOpen={menuOpen}
        setIsOpen={setMenuOpen}
        gameState={{
          life,
          setLife,
          startingHealth,
          history,
          setHistory,
          guest,
          setGuest,
          guestLife,
          setGuestLife,
          activeCounters,
          setActiveCounters,
          setReset
        }}
      />
      <View
        style={{
          flex: 1
        }}>
        <Pressable
          style={{
            position: 'absolute',
            top: 40,
            left: 5,
            zIndex: 10
          }}
          onPress={() => setMenuOpen(true)}>
          <Image source={menuButton} style={{ width: 80, height: 80 }} />
        </Pressable>
        <View
          style={{
            flex: 1,
            flexDirection: 'column'
          }}>
          {guest && (
            <View
              style={{
                height: '30%',
                width: '100%'
              }}>
              <GuestSkin life={guestLife} setLife={setGuestLife} />
            </View>
          )}
          <View
            style={{
              // height: guest ? '70%' : '100%',
              // width: '100%'
              flex: 1
            }}>
            <Skin skinID={skinID} life={life} setLife={setLife} />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              height: activeCounters.length > 0 ? '25%' : '0%',
              width: '100%',
              marginBottom: '-15%'
            }}>
            <Counters counters={activeCounters} reset={reset} />
          </View>
        </View>
      </View>
    </>
  );
}
