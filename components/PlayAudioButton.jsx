import { useRef, useEffect } from 'react';

import { Text } from 'react-native';
import { Audio } from 'expo-av';
import { TouchableOpacity } from 'react-native-gesture-handler';

// export const PlayAudioButton = ({ audioSource, autoplay }) => {
//   const audioRef = useRef(null);

//   useEffect(() => {
//     Audio.setAudioModeAsync({
//       allowsRecordingIOS: false,
//       staysActiveInBackground: false,
//       playsInSilentModeIOS: true,
//       interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
//       shouldDuckAndroid: true,
//       interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
//       playThroughEarpieceAndroid: false
//     });
//   }, []);

//   async function playSound() {
//     // const { sound } = await Audio.Sound.createAsync(audioSource);
//     // audioRef.current = sound;
//     // try {
//     //   console.log('playing audio!');
//     //   console.log(audioSource);

//     //   await sound.playAsync();
//     //   console.log('played audio!');
//     // } catch (error) {
//     //   console.log('error playing audio: ', error);
//     // }

//     const soundObject = new Audio.Sound();
//     await soundObject.loadAsync(require('../assets/audio/stab.mp3'));
//     try {
//       await soundObject.playAsync();
//       console.log('playing audio!');
//     } catch (error) {
//       console.log('error');
//     }
//   }

//   useEffect(() => {
//     if (autoplay) playSound();

//     // cleanup - important! avoids memory leaks
//     return () => {
//       // audio.current can be null if you click through too fast,
//       // so that the audio doesn't have time to load
//       if (audioRef.current !== null) {
//         audioRef.current.unloadAsync();
//       }
//     };
//   });

//   // android_disableSound switches off the default Android OS UI sound for pressing buttons
//   return (
//     <TouchableOpacity
//       android_disableSound={true}
//       style={{ backgroundColor: '#fff', flex: 1 }}
//       onPress={playSound}>
//       {/* your icon here */}
//       <Text>Beans</Text>
//     </TouchableOpacity>
//   );
// };

import { View, StyleSheet, Button } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/audio/Mars.mp3');

export default function PlayAudioButton() {
  const player = useAudioPlayer(audioSource);

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={() => player.play()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10
  }
});
