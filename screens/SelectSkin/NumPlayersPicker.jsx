import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import CounterImage from '../../images/Counter.png';

export default function NumPlayersStepper({ numPlayers, setNumPlayers }) {
  const minPlayers = 1;
  const maxPlayers = 4;

  const increment = () => {
    if (numPlayers < maxPlayers) {
      setNumPlayers(numPlayers + 1);
    }
  };

  const decrement = () => {
    if (numPlayers > minPlayers) {
      setNumPlayers(numPlayers - 1);
    }
  };

  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'column',

        justifyContent: 'center'
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
        <ImageBackground
          source={CounterImage}
          style={{
            position: 'absolute',
            top: -10,
            bottom: 0,
            height: 80,
            width: 80,
            marginLeft: '3%'
          }}></ImageBackground>

        {/* Decrement Button */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'center'
          }}>
          <TouchableOpacity
            onPress={decrement}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginHorizontal: 10
            }}>
            <Text
              style={{
                color: '#FFA500',
                fontSize: 30,
                fontFamily: 'Immortal'
              }}>
              {numPlayers > 1 ? '-' : ' '}
            </Text>
          </TouchableOpacity>
          {/* Player Count */}
          <Text
            style={{
              color: '#FFA500',
              fontSize: 30,
              fontFamily: 'Immortal',
              paddingHorizontal: 20
            }}>
            {numPlayers}
          </Text>
          {/* Increment Button */}
          <TouchableOpacity
            onPress={increment}
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginHorizontal: 10
            }}>
            <Text
              style={{
                color: '#FFA500',
                fontSize: 30,
                fontFamily: 'Immortal'
              }}>
              {numPlayers < 4 ? '+' : ' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Label */}
      <Text
        style={{
          color: '#FFA500',
          fontFamily: 'Endor',
          fontSize: 30,
          paddingTop: '5%'
        }}>
        Player{numPlayers === 1 ? '' : 's'}
      </Text>
    </View>
  );
}
