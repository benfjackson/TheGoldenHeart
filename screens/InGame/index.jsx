//Has the menu, manages state for the counters and passes into the skin
//Manages having the guest

import { Pressable } from 'react-native';
import getSkin from './getSkin';
import GuestSkin from '../../skins/Guest';
import { useState, useEffect } from 'react';
import PopupMenu from './popupMenu';
import Counters from './Counters';

import { View, Image } from 'react-native';

export default function InGame({ route }) {
  const skinID = route.params?.skinID;
  const startingHealth = route.params?.startingHealth;

  const [menuOpen, setMenuOpen] = useState(false);
  const [guest, setGuest] = useState(false);

  const [life, setLife] = useState(startingHealth);
  const [guestLife, setGuestLife] = useState(startingHealth);
  const [history, setHistory] = useState([]);
  const [activeCounters, setActiveCounters] = useState([]);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    setHistory([...history, life]);
  }, [life]);

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
              height: '25%',
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
