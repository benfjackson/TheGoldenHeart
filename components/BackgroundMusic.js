// BackgroundMusic.js
import { Audio } from 'expo-av';

let sound;

export async function startBackgroundMusic() {
  if (sound) return; // Prevent multiple instances

  try {
    console.log('starting sound');
    sound = new Audio.Sound();
    await sound.loadAsync(require('../assets/audio/Mars.mp3'));
    await sound.setIsLoopingAsync(true);
    await sound.playAsync();
    console.log('started sound');
  } catch (error) {
    console.error('Error loading or playing sound:', error);
  }
}

export async function stopBackgroundMusic() {
  if (!sound) return;

  try {
    await sound.stopAsync();
    await sound.unloadAsync();
    sound = null;
  } catch (error) {
    console.error('Error stopping sound:', error);
  }
}
