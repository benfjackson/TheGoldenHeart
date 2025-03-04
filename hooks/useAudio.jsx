import { useEffect, useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';
export default function useAudio() {
  const [song, setSong] = useState();

  //../assets/audio/I. Mars, the Bringer of War.ogg
  //   const source = ;

  async function loadSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/audio/stab.mp3')
    );
    setSong(sound);
    console.log('Loading Sound');
  }

  async function playSound() {
    console.log('Playing Sound');
    try {
      await song.playAsync();
    } catch (error) {
      console.log('error playing automatically', error);
    }
  }

  //   useEffect(() => {
  //     return song
  //       ? () => {
  //           console.log('Unloading Sound');
  //           song.unloadAsync();
  //         }
  //       : undefined;
  //   }, [song]);

  async function runSong() {
    await loadSound();
    playSound();
  }

  return {
    loadSound,
    playSound,
    runSong
  };
}
