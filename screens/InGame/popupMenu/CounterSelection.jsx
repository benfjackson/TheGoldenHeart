import { useNavigation } from '@react-navigation/native';

import { Text, View, Pressable, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function CountersSelection({ setMenuState, gameState }) {
  const backButton = require('../../../images/UI/BackButton.png');

  const { activeCounters, setActiveCounters } = gameState;
  const allCounters = [{ name: 'Blood' }, { name: 'Poison' }, { name: 'Time' }];

  const styles = StyleSheet.create({
    counterButton: {
      // width: '100%',
      // height: '100%',
      borderRadius: '100',
      borderWidth: 2,
      justifyContent: 'center',
      marginTop: 4,
      borderColor: 'rgb(250, 180, 40)'
    }
  });

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        alignItems: 'center'
      }}>
      <Pressable
        onPress={() => {
          setMenuState('game');
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
          Counters
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
            {allCounters.map((counter, index) => {
              const active =
                activeCounters.filter((c) => {
                  return counter.name === c.name;
                }).length !== 0;

              return (
                <Pressable
                  onPress={() => {
                    setActiveCounters((counters) => {
                      if (active) {
                        //remove counter
                        return counters.filter((c) => {
                          return c.name !== counter.name;
                        });
                      } else {
                        return [
                          ...activeCounters,
                          { name: counter.name, initialCount: 0 }
                        ];
                      }
                    });
                  }}
                  style={[
                    styles.counterButton,
                    {
                      backgroundColor: active ? 'rgb(250, 180, 40)' : '#000'
                    }
                  ]}
                  key={index}>
                  <Text
                    style={{
                      color: active ? '#000' : 'rgb(250, 180, 40)',
                      textAlign: 'center',
                      fontFamily: 'Endor',
                      fontSize: 20
                    }}>
                    {counter.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <Pressable
          onPress={() => {
            setActiveCounters([]);
          }}
          style={[
            {
              // backgroundColor: active ? 'rgb(250, 180, 40)' : '#000'
            }
          ]}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Endor',
              fontSize: 20,
              color: 'rgb(250, 180, 40)'
            }}>
            Reset
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
