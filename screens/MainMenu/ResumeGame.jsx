import { useNavigation } from '@react-navigation/native';
import { Button, View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { clearGameState } from '../../services/appStorage';

export default function ResumeGame({ gameState, onClose }) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      backgroundColor: 'black'
    },
    button: {
      color: '#FFA500',
      fontSize: 35,
      textAlign: 'center',
      fontFamily: 'Endor'
    },
    title: {
      color: '#FFA500',
      fontSize: 50,
      textAlign: 'center',
      fontFamily: 'Endor'
    }
  });

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Continue saved game?</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('InGame', {
            loadGameState: gameState
          });
          onClose();
        }}>
        <Text style={styles.button}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onClose();
          clearGameState();
        }}>
        <Text style={styles.button}>No</Text>
      </TouchableOpacity>
    </View>
  );
}
