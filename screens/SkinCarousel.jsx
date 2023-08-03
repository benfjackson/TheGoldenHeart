import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';

import { getSkinsInfo, getImage, getMiniImage } from '../services/getSkinInfo';

export default function SkinCarousel({
  favourites = ['Angel'],
  startingHealth
}) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (favourites?.length > 0) {
      const data = getSkinsInfo(favourites);
      setEntries(data);
    }
  }, [favourites]);

  const carouselRef = useRef(null);

  const frameImage = require('../images/UI/FRAME_TRANSPARENT.png');

  const styles = {
    slide: {
      flex: 1,
      flexDirection: 'column',
      borderRadius: 5,
      padding: 50,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    },
    title: {
      fontSize: 35,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginTop: 40,
      color: '#FFA500',
      fontFamily: 'Endor',
      height: '50%'
    }
  };

  const navigation = useNavigation();

  const artSize = 200;

  const renderItem = ({ item, index }) => {
    const data = item.data;
    data.miniImage = getMiniImage(data.id);
    return (
      <View style={styles.slide}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('InGame', {
              skinID: data.id,
              gameState: { life: startingHealth, guestLife: startingHealth }
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
              source={frameImage}
              style={{ width: artSize * 1.5, height: artSize * 1.5 }}
            />
          </ImageBackground>

          <Text style={styles.title}>{data.title}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const sliderWidth = 400;
  const itemWidth = 250;
  return (
    //Blue background

    // <Carousel
    //   ref={carouselRef}
    //   data={entries}
    //   renderItem={renderItem}
    //   sliderWidth={sliderWidth}
    //   itemWidth={itemWidth}
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    //   }}
    // />
    <Carousel
      mode="parallax"
      ref={carouselRef}
      // defaultIndex={LAST30INDEX}
      loop={false}
      width={400}
      height={400}
      data={entries}
      // onSnapToItem={(index) => console.log('current index:', index)}
      renderItem={renderItem}
    />
  );
}
