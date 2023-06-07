import Modal from 'react-native-modal';

import {
  Button,
  Text,
  View,
  Image,
  Pressable,
  ImageBackground
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

export default function CardModal({ isOpen, setIsOpen, gameState, ...props }) {
  //   const [isModalVisible, setModalVisible] = useState(false);

  const bg = require('../../images/UI/popupMenuBG.png');

  const navigation = useNavigation();

  return (
    <Modal
      style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
      isVisible={isOpen}
      onBackdropPress={() => setIsOpen(false)}
      {...props}>
      <ImageBackground
        style={{
          height: 600,
          width: 300,
          flexDirection: 'column',
          justifyContent: 'between',
          alignItems: 'center',
          padding: 80
          // flex: 1
        }}
        source={bg}>
        {/* <View> */}
        <Pressable
          onPress={() => {
            setIsOpen(false);
            navigation.navigate('MainMenu');
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 40
            }}>
            Home
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            gameState.setGuest(!gameState.guest);
            setIsOpen(false);
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 40
            }}>
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
          <Text
            style={{
              color: '#fff',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 40
            }}>
            Reset
          </Text>
        </Pressable>
        <Text
          style={{
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: 40
          }}>
          History
          {gameState.history.map((life, index) => (
            <Text key={index}>{life}</Text>
          ))}
        </Text>
      </ImageBackground>
    </Modal>
  );
}
