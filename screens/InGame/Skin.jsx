import BasicSkin from '../../skins/Basic/BasicSkin';
import { View, Image, Pressable, Text, Dimensions } from 'react-native';
import BasicTwoPlayer from '../../skins/two_player/basic/BasicTwoPlayer';
import BasicThreePlayer from '../../skins/three_player/basic/BasicThreePlayer';
import BasicFourPlayer from '../../skins/four_player/basic/BasicFourPlayer';
import { getSkinData } from '../../services/getSkinInfo';

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
  const skinData = getSkinData(skinID);
  const numPlayers = skinData.numPlayers;

  switch (numPlayers) {
    case 1:
      return <BasicSkin skinID={skinID} lives={lives} setLives={setLives} />;

    case 2:
      return (
        <BasicTwoPlayer skinID={skinID} lives={lives} setLives={setLives} />
      );

    case 3:
      return (
        <BasicThreePlayer skinID={skinID} lives={lives} setLives={setLives} />
      );

    case 4:
      return (
        <BasicFourPlayer skinID={skinID} lives={lives} setLives={setLives} />
      );

    default:
      return (
        <Text style={{ color: 'white' }}>
          No skin loaded (no num players given)
        </Text>
      );
  }
}
