import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

export default function PlayScreen({}) {
  const backButton = require('../images/UI/BackButton.png');
  const [entries, setEntries] = useState([
    {
      title: 'Devils',
      subtitle: 'Devil',
      illustration: require('../images/upscaled/Devil.png'),
      navigateTo: 'Devil'
    },
    {
      title: 'Noble Vampires',
      subtitle: 'Noble Vampires',
      illustration: require('../images/upscaled/VampireGirl.png'),
      navigateTo: 'VampireGirl'
    },
    {
      title: 'Glorious Sunrise',
      subtitle: 'GloriousElk',
      illustration: require('../images/upscaled/Elk.png'),
      navigateTo: 'GloriousElk'
    },
    {
      title: 'The Kraken',
      subtitle: 'Kraken',
      illustration: require('../images/upscaled/Kraken.png'),
      navigateTo: 'Kraken'
    },
    {
      title: 'Ruby Dragon',
      subtitle: 'LightningDragon',
      illustration: require('../images/upscaled/LightningDragon.png'),
      navigateTo: 'LightningDragon'
    }
  ]);

  const carouselRef = useRef(null);

  const frameImage = require('../images/UI/FRAME_TRANSPARENT.png');

  const styles = {
    slide: {
      //flex column
      flexDirection: 'column',
      // backgroundColor: 'gold',
      borderRadius: 5,
      padding: 50,
      justifyContent: 'center',
      alignItems: 'center'

      // marginLeft: 25
      // marginRight: 25
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      //Top margin
      marginTop: 40,
      //gold text
      // color: '#FFD700'
      //dark gold text
      // color: '#D4AF37'
      //orange gold text
      color: '#FFA500'
    }
  };

  const navigation = useNavigation();

  const artSize = 200;

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={styles.slide}
        //How to do this right?
        // onPress={() => {
        //   navigation.navigate(item.navigateTo);
        // }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(item.navigateTo);
          }}>
          <ImageBackground
            source={item.illustration}
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

          {/* Centre the text */}

          <Text style={styles.title}>{item.title}</Text>
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
      />
    </View>
  );
  //   return <></>;
}
