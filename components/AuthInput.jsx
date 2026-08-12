import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../styles';

export default function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  autoCapitalize = 'none'
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 165, 0, 0.5)"
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8
  },
  label: {
    color: colors.gold,
    marginBottom: 6,
    fontSize: 16
  },
  input: {
    color: colors.gold,
    borderBottomWidth: 1,
    borderBottomColor: colors.gold,
    paddingVertical: 8,
    fontSize: 16
  }
});
