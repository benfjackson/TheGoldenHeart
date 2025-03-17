import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Input } from '@rneui/themed';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../styles';
import BasicButton from '../../components/BasicButton';
import {
  signInWithEmail,
  signUpWithEmail,
  signOut
} from '../../auth/supabaseClient';
import { useAuth } from '../../auth/AuthContext'; // Use the global auth state

export default function Login({ route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { session } = useAuth(); // Get the current auth session

  // Redirect user once they're logged in
  useEffect(() => {
    if (session) {
      navigation.goBack(); // Go back to previous screen
    }
  }, [session, navigation]);

  // Handles login
  const handleSignIn = async () => {
    const { error } = await signInWithEmail(email, password);
    if (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  // Handles signup
  const handleSignUp = async () => {
    const { error } = await signUpWithEmail(email, password);
    if (error) {
      Alert.alert('Signup Error', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Input
            style={{ color: colors.gold }}
            labelStyle={{ color: colors.gold }}
            label="Email"
            leftIcon={{
              type: 'font-awesome',
              name: 'envelope',
              color: colors.gold
            }}
            onChangeText={setEmail}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.verticallySpaced}>
          <Input
            style={{ color: colors.gold }}
            label="Password"
            labelStyle={{ color: colors.gold }}
            leftIcon={{
              type: 'font-awesome',
              name: 'lock',
              color: colors.gold
            }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            underlineColorAndroid={colors.gold}
          />
        </View>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <BasicButton onPress={handleSignIn} text="Sign in" />
        </View>
        <View style={styles.verticallySpaced}>
          <BasicButton onPress={handleSignUp} text="Sign up" />
        </View>
        <View style={styles.verticallySpaced}>
          <BasicButton onPress={signOut} text="Sign out" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch'
  },
  mt20: {
    marginTop: 20
  }
});
