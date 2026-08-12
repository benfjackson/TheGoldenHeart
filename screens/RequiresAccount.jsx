import React, { useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthContext';

export default function RequiresAccount({ children }) {
  const { session, loading } = useAuth();
  const navigation = useNavigation();
  const hasNavigated = useRef(false);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (session) {
      hasNavigated.current = false;
      return;
    }

    if (!hasNavigated.current) {
      hasNavigated.current = true;
      navigation.navigate('Login');
    }
  }, [session, loading, navigation]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return <>{children}</>;
}
