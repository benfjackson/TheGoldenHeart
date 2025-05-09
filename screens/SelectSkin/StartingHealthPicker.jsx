import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import CounterImage from '../../images/Counter.png';
import { fonts } from '../../styles';

export default function NumPlayersStepper({
  startingHealth,
  setStartingHealth
}) {
  const startingHealthOptions = [20, 25, 30, 40];
  const currentIndex = startingHealthOptions.indexOf(startingHealth);

  const increment = () => {
    if (currentIndex < startingHealthOptions.length - 1) {
      setStartingHealth(startingHealthOptions[currentIndex + 1]);
    }
  };

  const decrement = () => {
    if (currentIndex > 0) {
      setStartingHealth(startingHealthOptions[currentIndex - 1]);
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
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',

            justifyContent: 'center'
          }}>
          {/* Decrement Button */}
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
              {currentIndex > 0 ? '-' : ' '}
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: '#FFA500',
              fontSize: 30,
              fontFamily: 'Immortal',
              paddingHorizontal: 20
            }}>
            {startingHealth}
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
              {currentIndex < startingHealthOptions.length - 1 ? '+' : ' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Label */}
      <Text
        style={{
          color: '#FFA500',
          fontFamily: fonts.readableText,
          fontSize: 30,
          paddingTop: '5%'
        }}>
        Health
      </Text>
    </View>
  );
}
