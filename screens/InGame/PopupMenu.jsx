import Modal from 'react-native-modal';

import {
  Button,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground,
  StyleSheet
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function CardModal({ isOpen, setIsOpen, gameState, ...props }) {
  //   const [isModalVisible, setModalVisible] = useState(false);

  const bg = require('../../images/UI/popupMenuBG.png');

  const navigation = useNavigation();

  const styles = StyleSheet.create({
    container: {
      // flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      padding: 80,
      width: 600,
      height: 600
    },
    button: {
      width: 200,
      height: 100,
      backgroundColor: 'red',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center'
    }
  });

  return (
    <Modal
      style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
      isVisible={isOpen}
      onBackdropPress={() => setIsOpen(false)}
      {...props}>
      <ImageBackground style={styles.container} source={bg}>
        {/* <View> */}
        <Pressable
          onPress={() => {
            setIsOpen(false);
            navigation.navigate('MainMenu');
          }}>
          <Text style={styles.buttonText}>Home</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            gameState.setGuest(!gameState.guest);
            setIsOpen(false);
          }}>
          <Text style={styles.buttonText}>
            {gameState.guest ? 'Remove guest' : 'Add guest'}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            gameState.setLife(20);
            gameState.setHistory([]);
            gameState.setGuestLife(20);
            setIsOpen(false);
          }}>
          <Text style={{ ...styles.buttonText }}>Reset</Text>
        </Pressable>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 40
          }}>
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20
              }}>
              History
            </Text>
            {[gameState.life, ...gameState.history].map((life, index) => (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20
                }}
                key={index}>
                {life}
              </Text>
            ))}
          </View>
        </Text>
      </ImageBackground>
    </Modal>
  );
}
