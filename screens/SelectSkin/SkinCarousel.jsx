import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeOut, FadeIn } from 'react-native-reanimated';

import FrameImage from '../../images/FRAME_TRANSPARENT.png';
import { getSkinsInfo, getMiniImage } from '../../services/getSkinInfo';

import { fonts } from '../../styles';

export default function SkinCarousel({
  favourites = ['Angel'],
  startingHealth,
  numPlayers
}) {
  const [allSkins, setAllSkins] = useState([]);
  const [skinsToDisplay, setSkinsToDisplay] = useState([]);
  const [currentKey, setCurrentKey] = useState(0);

  useEffect(() => {
    if (favourites?.length > 0) {
      const data = getSkinsInfo(favourites);
      setAllSkins(data);
    }
  }, [favourites]);

  useEffect(() => {
    // Fade out first, then update the state
    setCurrentKey((prev) => prev + 1); // Changing key forces re-render with animation
    setTimeout(() => {
      setSkinsToDisplay(
        allSkins.filter((skin) => Number(skin.data.numPlayers) === numPlayers)
      );
    }, 200); // Delay allows fade-out before state update
  }, [numPlayers, allSkins]);

  const carouselRef = useRef(null);
  const navigation = useNavigation();
  const { width: SCREEN_WIDTH } = Dimensions.get('window');

  const artSize = 0.5 * SCREEN_WIDTH;
  const frameSize = 0.75 * SCREEN_WIDTH;

  const styles = {
    slide: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingTop: 50,
      overflow: 'visible',
      paddingBottom: 50
    },
    title: {
      fontSize: 35,
      textAlign: 'center',
      marginTop: '10%',
      color: '#FFA500',
      fontFamily: fonts.readableText,

      overflow: 'visible',

      paddingTop: 20
    }
  };

  const renderItem = ({ item }) => {
    const data = item.data;
    data.miniImage = getMiniImage(data.id);
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          style={{ overflow: 'visible' }}
          onPress={() =>
            navigation.navigate('InGame', {
              initialiseGameState: {
                numPlayers: 1,
                skinID: data.id,
                startingLife: startingHealth
              }
            })
          }>
          <ImageBackground
            source={data.miniImage}
            style={{
              width: artSize,
              height: artSize,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center'
            }}>
            <Image
              source={FrameImage}
              style={{ width: frameSize, height: frameSize }}
            />
          </ImageBackground>
          <Text style={styles.title}>{data.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        overflow: 'visible',
        flex: 1,
        //make the min height fit the maximum height of the carousel, which is the frame size + all the padding plus the max height of the titles.
        minHeight:
          frameSize + 2 * styles.slide.paddingTop + styles.title.fontSize + 20
      }}
      key={currentKey}
      entering={FadeIn.duration(1000)}
      exiting={FadeOut.duration(1000)}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          overflow: 'visible',
          paddingBottom: 50
        }}>
        <Carousel
          ref={carouselRef}
          data={skinsToDisplay}
          renderItem={renderItem}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={0.7 * SCREEN_WIDTH}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible'
          }}
        />
      </View>
    </Animated.View>
  );
}
