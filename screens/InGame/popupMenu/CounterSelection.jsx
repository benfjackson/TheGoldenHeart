import allCounters from './allCounters';

import { Text, View, Pressable, Image, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function CountersSelection({ setMenuState, counterControl }) {
  const { counters, addCounter, removeCounter, clearCounters } = counterControl;

  const backButton = require('../../../images/BackArrow1.png');

  const styles = StyleSheet.create({
    counterButton: {
      // width: '100%',
      // height: '100%',
      borderRadius: 100,
      borderWidth: 2,
      justifyContent: 'center',
      marginTop: 4,
      borderColor: 'rgb(250, 180, 40)'
    }
  });

  return (
    <View
      style={{
        // flex: 1,
        // marginTop: '20%',
        paddingTop: 40,
        width: '100%',
        height: '80%',
        alignItems: 'center'
      }}>
      <Pressable
        onPress={() => {
          setMenuState('main');
        }}
        style={{
          alignSelf: 'flex-start'
        }}>
        <Image source={backButton} style={{ width: 50, height: 35 }} />
      </Pressable>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
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
              const active = false;

              return (
                <Pressable
                  onPress={() => {
                    addCounter(counter);
                  }}
                  style={[
                    styles.counterButton,
                    {
                      backgroundColor: active ? 'rgb(250, 180, 40)' : '#000'
                    }
                  ]}
                  key={'counterOption' + index}>
                  <Text
                    style={{
                      color: active ? '#000' : 'rgb(250, 180, 40)',
                      textAlign: 'center',
                      fontFamily: 'Endor',
                      fontSize: 20
                    }}>
                    {counter.counterName}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <Pressable
          onPress={() => {
            clearCounters();
          }}
          style={[{}]}>
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
