import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../auth/AuthContext';

export default function RequiresAccount({ children }) {
  const { session, loading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!loading && !session) {
      navigation.navigate('Login');
    }
  }, [session, loading, navigation]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return <>{children}</>;
}
