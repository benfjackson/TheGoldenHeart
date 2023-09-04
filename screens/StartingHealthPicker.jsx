import { View, Text, Pressable } from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {
  ChevronRightIcon,
  ChevronLeftIcon
} from 'react-native-heroicons/solid';

import { useState, useRef, useEffect } from 'react';

export default function StartingHealthPicker({ setStartingHealth }) {
  //   const [currIndex, setCurrIndex] = useState(INDEX20HEALTH);

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
              borderRadius: 100,
              padding: 2,
              paddingHorizontal: 4,
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
                paddingVertical: 4,
                fontFamily: 'Immortal'
              }}>
              {item}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const sliderWidth = 400;
  const itemWidth = 100;

  return (
    <View
      style={{ width: '100%', alignItems: 'center', flexDirection: 'column' }}>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View
          style={{
            alignSelf: 'center',
            width: '20%',
            position: 'absolute',
            top: 0,
            bottom: 0,
            flex: 1
          }}>
          {/* <Pressable
              className={` ${currIndex === 0 && 'opacity-0'}`}
              onPress={() => carouselRef.current.snapToPrev()}>
              <ChevronLeftIcon className="w-6 h-6" />
            </Pressable> */}
          <View
            style={{
              // flex: 1,
              height: '100%',
              borderRadius: 100,
              borderWidth: 2,
              backgroundColor: '#00000000',
              borderColor: '#FFA500'
            }}
            //   className="flex-1 h-full rounded-full border-2 border-blue bg-transparent"
          />
          {/* <Pressable
              onPress={() => carouselRef.current.snapToNext()}
              className={` ${currIndex === LAST30INDEX + 1 && 'opacity-0'}`}>
              <ChevronRightIcon className={`w-6 h-6`} />
            </Pressable> */}
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
      <Text style={{ color: '#FFA500', fontFamily: 'Endor', fontSize: 30 }}>
        Starting Health
      </Text>
    </View>
  );
}
