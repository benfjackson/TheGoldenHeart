import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../../styles';

export default function BasicButton({ onPress, text }) {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 3,
        borderRadius: 30,
        borderColor: colors.gold,
        alignItems: 'center',
        padding: 8
      }}
      onPress={onPress}>
      <Text style={{ color: colors.gold, fontSize: 22 }}>{text}</Text>
    </TouchableOpacity>
  );
}
