import { useNavigation } from '@react-navigation/native';

import { Text, View, Pressable, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function History({ setMenuState, gameState }) {
  const backButton = require('../../../images/UI/BackButton.png');
  //deep copy history

  const history = [...gameState.history];
  history.reverse();
  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center'
      }}>
      <Pressable
        onPress={() => {
          setMenuState('main');
        }}
        style={{
          alignSelf: 'flex-start'
        }}>
        <Image source={backButton} style={{ width: 50, height: 50 }} />
      </Pressable>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          //   alignSelf: 'flex-center',
          alignItems: 'center',
          width: '70%'
        }}>
        <Text
          style={{
            color: 'rgb(250, 180, 40)',
            fontSize: 40,
            textAlign: 'center',
            fontFamily: 'Endor'
          }}>
          History
        </Text>
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            marginTop: 10,
            overflow: 'scroll'
          }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            {[...history].map((life, index) => {
              var prevLife = history[index + 1] || 20;
              const diff = life - prevLife;
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                  key={index}>
                  {/* Difference in life and prev entry */}
                  <Text
                    style={{
                      fontSize: 20,
                      color: diff > 0 ? '#0f0' : '#f00'
                    }}>
                    {diff > 0 ? '+' : ''}
                    {prevLife && (diff === 0 ? '' : diff)}
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 20
                    }}>
                    {life}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
