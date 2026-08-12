import React, { useState, useEffect, useRef } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import BasicButton from '../../components/BasicButton';
import AuthInput from '../../components/AuthInput';
import {
  signInWithEmail,
  signUpWithEmail,
  signOut
} from '../../auth/supabaseClient';
import { useAuth } from '../../auth/AuthContext';
import { logError } from '../../utils/logger';

export default function Login({ route }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { session } = useAuth();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (!session || hasRedirected.current) {
      return undefined;
    }

    hasRedirected.current = true;
    const timeoutId = setTimeout(() => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [session, navigation]);

  const handleSignIn = async () => {
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        Alert.alert('Login Error', error.message);
      }
    } catch (error) {
      logError('Login', 'Sign in handler failed', error, { email });
      Alert.alert('Login Error', 'Something went wrong. Please try again.');
    }
  };

  const handleSignUp = async () => {
    try {
      const { error } = await signUpWithEmail(email, password);
      if (error) {
        Alert.alert('Signup Error', error.message);
      }
    } catch (error) {
      logError('Login', 'Sign up handler failed', error, { email });
      Alert.alert('Signup Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.container}>
        <View style={[styles.verticallySpaced, styles.mt20]}>
          <AuthInput
            label="Email"
            onChangeText={setEmail}
            value={email}
            placeholder="email@address.com"
          />
        </View>
        <View style={styles.verticallySpaced}>
          <AuthInput
            label="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Password"
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
