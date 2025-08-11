import Modal from 'react-native-modal';

// import Main from './Main';
// import History from './History';
// import CountersSelection from './CounterSelection';

import {
  Text,
  View,
  Pressable,
  ImageBackground,
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Sparkles from '../../components/Sparkle/Sparkles';

import { completeTutorial } from '../../services/appStorage';
import { fonts } from '../../styles';

export default function PopupMenu({
  isOpen,
  setIsOpen,
  numPlayers,
  histories,
  counterControl,
  resetGame,
  tutorialStep,
  ...props
}) {
  const bg = require('../InGame/popupMenu/popup.png');
  const [menuState, setMenuState] = useState('main');
  const styles = StyleSheet.create({
    button: {
      color: 'rgb(250, 180, 40)',
      fontSize: 35,
      textAlign: 'center',
      fontFamily: fonts.readableText
    }
  });
  const navigation = useNavigation();
  return (
    <Modal
      style={{
        flex: 1
      }}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      animationInTiming={1000}
      animationOutTiming={1000}
      isVisible={isOpen}
      onBackdropPress={() => {
        setMenuState('main');
        setIsOpen(false);
      }}
      {...props}>
      <ImageBackground
        imageStyle={{
          resizeMode: 'contain',
          // width: '100%',
          height: '100%'
        }}
        source={bg}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            width: '70%',
            height: '70%',
            marginLeft: '15%',
            marginRight: '15%',
            marginTop: '25%'
          }}>
          <View
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
            }}>
            <Text
              style={[
                styles.button,
                { fontSize: 30, lineHeight: 40, marginBottom: 20 }
              ]}>
              Use the menu to{'\n'}
              Reset your life{'\n'}add counters{'\n'}or quit home
            </Text>
            <Sparkles on={true}>
              <Pressable
                onPress={async () => {
                  setIsOpen(false);
                  completeTutorial().then(() =>
                    navigation.navigate('HomeScreen')
                  );
                }}>
                <Text style={styles.button}>complete tutorial</Text>
              </Pressable>
            </Sparkles>
          </View>
        </View>
      </ImageBackground>
    </Modal>
  );
}
