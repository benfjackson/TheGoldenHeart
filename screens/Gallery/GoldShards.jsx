import { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import shardIconImage from './shardIcon2.jpg';
import { colors, fonts } from '../../styles';
import { useProfile } from '../../hooks/useProfile';

export default function GoldShards() {
  //Should be useQuery?
  const { profile, loading, error } = useProfile();

  // if (loading) return <ActivityIndicator />;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0,
        borderColor: colors.gold,
        borderWidth: 2,
        borderRadius: 40,
        paddingHorizontal: 20,
        paddingRight: 30,
        paddingVertical: 2,
        height: 60,
        overflow: 'hidden'
      }}>
      <Image
        source={shardIconImage}
        style={{
          height: 60,
          width: 40
        }}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text
          style={{
            color: colors.gold,
            fontFamily: fonts.number,
            fontSize: 35
          }}>
          {profile?.gold_shards}
        </Text>
      )}
    </View>
  );
}
