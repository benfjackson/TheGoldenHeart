import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { Button, Input } from '@rneui/themed';

import { colors } from '../../styles';
import { TouchableOpacity } from 'react-native';
import BasicButton from '../BasicButton';


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
        <Input
          style={{ color: colors.gold }}
          labelStyle={{ color: colors.gold }}
          label="Email"
          leftIcon={{
            type: 'font-awesome',
            name: 'envelope',
            color: colors.gold
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          style={{
            color: colors.gold
          }}
          label="Password"
          labelStyle={{
            color: colors.gold
          }}
          leftIcon={{ type: 'font-awesome', name: 'lock', color: colors.gold }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          underlineColorAndroid={colors.gold}
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
