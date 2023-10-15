import { TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import PlayButton from './PlayButton.gif';

export default function VideoButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('SelectSkin')}>
      <Image
        source={PlayButton}
        style={{
          resizeMode: 'contain',
          width: 300
        }}
      />
    </TouchableOpacity>
  );
}
