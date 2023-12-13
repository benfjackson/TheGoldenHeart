import BasicSkin from '../../skins/Basic/BasicSkin';
import Basic4Player from '../../skins/four_player/basic/Basic4Player';
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
    case 'peen':
      return <Basic4Player skinID={skinID} lives={lives} setLives={setLives} />;
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
