import BasicSkin from '../../skins/Basic/BasicSkin';
import { View, Image, Pressable, Text, Dimensions } from 'react-native';

export default function Skin({ skinID, lives, setLives }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1, width: windowWidth, height: windowHeight }}>
      <GetSkin skinID={skinID} lives={lives} setLives={setLives} />
    </View>
  );
}
export function GetSkin({ skinID, lives, setLives }) {
  switch (skinID) {
    case 'kDevil':
      return (
        <Text
          style={{
            color: '#FFA500',
            fontSize: 50,
            textAlign: 'center',
            fontFamily: 'Endor',
            // flex: 1
            height: 5000
          }}>
          Peen
        </Text>
      );
    default:
      return <BasicSkin skinID={skinID} lives={lives} setLives={setLives} />;
    // return (, width: windowWidth
    //   <Text
    //     style={{
    //       color: '#FFA500',
    //       fontSize: 50,
    //       textAlign: 'center',
    //       fontFamily: 'Endor'
    //     }}>
    //     Peen
    //   </Text>
    // );
  }
}
