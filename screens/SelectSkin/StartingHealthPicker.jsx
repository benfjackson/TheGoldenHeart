import { View, Text, Pressable, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CounterImage from '../../images/Counter.png';

import { useRef } from 'react';

import { Dimensions, Platform, PixelRatio } from 'react-native';

export default function StartingHealthPicker({ setStartingHealth }) {
  const entries = [20, 25, 30, 40, 60, 100];

  const carouselRef = useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <Pressable
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row'
        }}
        onPress={() => {
          carouselRef.current.snapToItem(index);
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            zIndex: 100
          }}>
          <View
            style={{
              // borderRadius: 100,
              // padding: 2,
              // paddingHorizontal: 4,
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Text
              // ${index === currIndex ? 'text-blue' : 'text-black'}
              //           Endor: require('./assets/fonts/endor/ENDOR___.ttf'),
              // Immortal: require('./assets/fonts/immortal/IMMORTAL.ttf'),
              // // TheLastKingdom: require('./assets/fonts/the-last-kingdom/THE LAST KINGDOM.ttf'),
              // Alamak:
              style={{
                color: '#FFA500',
                fontSize: 30,
                paddingVertical: '5%',
                fontFamily: 'Immortal'
              }}>
              {item}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get('window');

  const sliderWidth = SCREEN_WIDTH;
  const itemWidth = 0.25 * SCREEN_WIDTH;

  return (
    <View
      style={{ width: '100%', alignItems: 'center', flexDirection: 'column' }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View
          style={{
            alignSelf: 'center',
            width: '20%',
            height: '100%',
            position: 'absolute',
            top: 0,
            bottom: 0,
            flex: 1
          }}>
          <ImageBackground
            style={{
              height: '130%',
              // width: 250, //'100%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '-20%'
            }}
            source={CounterImage}
          />
        </View>
        <Carousel
          ref={carouselRef}
          data={entries}
          renderItem={renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10
          }}
          onSnapToItem={(index) => setStartingHealth(entries[index])}
          firstItem={0}
        />
      </View>
      <Text
        style={{
          color: '#FFA500',
          fontFamily: 'Endor',
          fontSize: 30,
          paddingTop: '5%'
        }}>
        Starting Health
      </Text>
    </View>
  );
}
