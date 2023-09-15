import { Pressable, View, Image } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function VideoButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    // Handle the button press event here
    setIsPlaying(!isPlaying);
    //delay for 2 seconds, then navigate to SelectSkin
    setTimeout(() => {
      navigation.navigate('SelectSkin');
    }, 500);
  };
  const buttonImage = require('./PlayButton3.png');
  const buttonGif = require('./3.gif');

  return (
    <Pressable onPress={handlePress}>
      <View style={{}}>
        {/* <Video
          source={{ uri: '../assets/video/1.mp4' }}
          style={{ width: 100, height: 100 }}
          resizeMode="cover"
          paused={true} // Pause the video when it's not playing
        /> */}
        {isPlaying ? (
          <Image
            source={buttonGif}
            style={{
              resizeMode: 'contain',
              width: 300
              // width: 100
              // flex: 1
              // height: undefined,
              // aspectRatio: 1
            }}
          />
        ) : (
          <Image
            source={buttonImage}
            style={{
              resizeMode: 'contain',
              width: 300
            }}
          />
        )}
      </View>
    </Pressable>
  );
}
