import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import BasicButton from '../BasicButton';
import AuthInput from '../AuthInput';

import {
  signInWithEmail,
  signUpWithEmail
} from '../../services/supabaseClient';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  return (
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
        <BasicButton
          onPress={() => signInWithEmail(email, password)}
          text={'Sign in'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <BasicButton
          onPress={() => signUpWithEmail(email, password)}
          text={'Sign up'}
        />
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
