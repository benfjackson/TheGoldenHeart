import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  Dimensions,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue
} from 'react-native-reanimated';

import FrameImage from '../../images/FRAME_TRANSPARENT.png';
import { getSkinsInfo, getMiniImage } from '../../services/getSkinInfo';

import { fonts } from '../../styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

function CarouselItem({
  item,
  index,
  scrollX,
  itemWidth,
  frameSize,
  artSize,
  onSelect
}) {
  const data = item.data;
  const miniImage = getMiniImage(data.id);

  const animatedStyle = useAnimatedStyle(() => {
    const centerOffset = index * itemWidth;
    const scale = interpolate(
      scrollX.value,
      [centerOffset - itemWidth, centerOffset, centerOffset + itemWidth],
      [0.86, 1, 0.86],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      scrollX.value,
      [centerOffset - itemWidth, centerOffset, centerOffset + itemWidth],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }],
      opacity
    };
  });

  return (
    <View
      style={{
        width: itemWidth,
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        overflow: 'visible'
      }}>
      <Animated.View style={[{ alignItems: 'center', overflow: 'visible' }, animatedStyle]}>
        <Pressable
          style={{ width: itemWidth, alignItems: 'center', overflow: 'visible' }}
          onPress={() => onSelect(data.id)}>
          <View
            style={{
              width: frameSize,
              height: frameSize,
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible'
            }}>
            <ImageBackground
              source={miniImage}
              style={{
                width: artSize,
                height: artSize,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            />
            <Image
              source={FrameImage}
              style={{
                position: 'absolute',
                width: frameSize,
                height: frameSize
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 35,
              textAlign: 'center',
              width: itemWidth - 24,
              alignSelf: 'center',
              marginTop: 12,
              color: '#FFA500',
              fontFamily: fonts.readableText
            }}>
            {data.title}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

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
      allSkins.filter((skin) => Number(skin.data.numPlayers) === numPlayers)
    );
  }, [numPlayers, allSkins]);

  const navigation = useNavigation();
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
  const scrollX = useSharedValue(0);
  const listRef = useRef(null);

  useEffect(() => {
    scrollX.value = 0;
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [numPlayers, scrollX]);

  const pickerRowHeight = 130;
  const topInset = SCREEN_WIDTH * 0.2;
  const titleBlockHeight = 100;
  const slideVerticalPadding = 12;
  const baseFrameSize = SCREEN_WIDTH * 0.85;
  const baseArtSize = SCREEN_WIDTH * 0.567;
  const baseItemWidth = SCREEN_WIDTH * 0.793;
  const carouselHeight =
    SCREEN_HEIGHT - topInset - pickerRowHeight - slideVerticalPadding * 2;
  const maxFrameSize = carouselHeight - titleBlockHeight;
  const scale = Math.min(1, maxFrameSize / baseFrameSize);
  const frameSize = baseFrameSize * scale;
  const artSize = baseArtSize * scale;
  const itemWidth = baseItemWidth * scale;
  const sidePadding = (SCREEN_WIDTH - itemWidth) / 2;

  const snapToOffsets = useMemo(
    () => skinsToDisplay.map((_, index) => index * itemWidth),
    [skinsToDisplay, itemWidth]
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    }
  });

  const handleSelect = useCallback(
    (skinID) => {
      navigation.navigate('InGame', {
        initialiseGameState: {
          numPlayers,
          skinID,
          startingLife: startingHealth
        }
      });
    },
    [navigation, numPlayers, startingHealth]
  );

  const renderItem = useCallback(
    ({ item, index }) => (
      <CarouselItem
        item={item}
        index={index}
        scrollX={scrollX}
        itemWidth={itemWidth}
        frameSize={frameSize}
        artSize={artSize}
        onSelect={handleSelect}
      />
    ),
    [scrollX, itemWidth, frameSize, artSize, handleSelect]
  );

  return (
    <View style={{ flex: 1, width: '100%', overflow: 'visible' }}>
      <AnimatedFlatList
        ref={listRef}
        style={{ flex: 1 }}
        data={skinsToDisplay}
        renderItem={renderItem}
        keyExtractor={(item) => item.data.id}
        horizontal
        bounces
        showsHorizontalScrollIndicator={false}
        snapToOffsets={snapToOffsets}
        snapToAlignment="start"
        decelerationRate="normal"
        scrollEventThrottle={16}
        onScroll={onScroll}
        contentContainerStyle={{
          paddingHorizontal: sidePadding,
          paddingVertical: slideVerticalPadding
        }}
        getItemLayout={(_, index) => ({
          length: itemWidth,
          offset: itemWidth * index,
          index
        })}
        initialNumToRender={3}
        windowSize={5}
        removeClippedSubviews={false}
      />
    </View>
  );
}
