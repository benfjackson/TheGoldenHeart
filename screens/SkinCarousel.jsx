import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

import { getSkinsInfo, getImage, getMiniImage } from '../services/getSkinInfo';

export default function SkinCarousel({ favourites = ['Angel'] }) {
  const backButton = require('../images/UI/BackButton.png');
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
      flexDirection: 'column',
      borderRadius: 5,
      padding: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      marginTop: 40,
      color: '#FFA500'
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
              skinID: data.id
            });
          }}>
          <ImageBackground
            source={data.miniImage}
            style={{
              width: artSize,
              height: artSize,
              justifyContent: 'center',
              alignItems: 'center'
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
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black',
        alignItems: 'center'
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MainMenu');
        }}
        style={{
          position: 'absolute',
          top: 40,
          left: 10,
          width: 50,
          height: 50
        }}>
        <Image source={backButton} style={{ width: 50, height: 50 }} />
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        data={entries}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
    </View>
  );
}
