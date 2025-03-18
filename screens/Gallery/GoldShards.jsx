import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import shardIconImage from './shardIcon2.jpg';
import { colors, fonts } from '../../styles';
import { fetchGoldShards, fetchUserProfile } from '../../services/api';

export default function GoldShards() {
  //Should be useQuery?
  const [shardCount, setShardCount] = useState(0);

  fetchUserProfile();
  //   fetchGoldShards();

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
        paddingVertical: 2
      }}>
      <Image source={shardIconImage} style={{ height: 60, width: 40 }} />
      <Text
        style={{ color: colors.gold, fontFamily: fonts.number, fontSize: 35 }}>
        {shardCount}
      </Text>
    </View>
  );
}
