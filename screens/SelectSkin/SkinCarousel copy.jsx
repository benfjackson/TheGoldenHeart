import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
// import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import FrameImage from '../../images/FRAME_TRANSPARENT.png';

import {
  getSkinsInfo,
  getImage,
  getMiniImage
} from '../../services/getSkinInfo';

import { Dimensions, Platform, PixelRatio } from 'react-native';

export default function SkinCarousel({
  favourites = ['Angel'],
  startingHealth,
  numPlayers
}) {
  const [allSkins, setAllSkins] = useState([]);
  const [skinsToDisplay, setSkinsToDisplay] = useState([]);

  useEffect(() => {
    if (favourites?.length > 0) {
      const data = getSkinsInfo(favourites);
      setAllSkins(data);
    }
  }, [favourites]);

  useEffect(() => {
    setSkinsToDisplay(
      allSkins.filter((skin) => {
        return Number(skin.data.numPlayers) === numPlayers;
      })
    );
  }, [numPlayers, allSkins]);

  const carouselRef = useRef(null);

  const styles = {
    slide: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    },
    title: {
      fontSize: 35,
      textAlign: 'center',
      marginTop: '10%',
      color: '#FFA500',
      fontFamily: 'Endor',
      height: '50%'
    }
  };

  const navigation = useNavigation();

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get('window');

  const artSize = 0.5 * SCREEN_WIDTH;
  const frameSize = 0.75 * SCREEN_WIDTH;

  const renderItem = ({ item, index }) => {
    const data = item.data;
    data.miniImage = getMiniImage(data.id);
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('InGame', {
              initialiseGameState: {
                numPlayers: 1,
                skinID: data.id,
                startingLife: startingHealth
              }
            });
          }}>
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

  const sliderWidth = SCREEN_WIDTH;
  const itemWidth = 0.7 * SCREEN_WIDTH;
  return (
    <Carousel
      ref={carouselRef}
      data={skinsToDisplay}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    />
  );
}
