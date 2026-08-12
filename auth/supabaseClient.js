import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { logError, logInfo } from '../utils/logger';

const supabaseUrl = 'https://eixiuqvoidxhxlnjnkfg.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeGl1cXZvaWR4aHhsbmpua2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMTc3MTMsImV4cCI6MjA1Njg5MzcxM30.SPeM3XKvDnZvgvg-YjhqAIyb1ffr-YPJjD5YdyVnENw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

export async function signInWithEmail(email, password) {
  try {
    const {
      data: { session },
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      logError('Auth', 'Sign in failed', error, { email });
      Alert.alert(error.message);
      return { session: null, error };
    }

    if (!session) {
      const noSessionError = new Error(
        'Sign in succeeded but no session was returned'
      );
      logError('Auth', 'Missing session after sign in', noSessionError, {
        email
      });
      return { session: null, error: noSessionError };
    }

    logInfo('Auth', 'Sign in succeeded', { userId: session.user?.id });
    return { session, error: null };
  } catch (error) {
    logError('Auth', 'Sign in threw an unexpected error', error, { email });
    return { session: null, error };
  }
}

export async function signUpWithEmail(email, password) {
  try {
    const {
      data: { session },
      error
    } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      logError('Auth', 'Sign up failed', error, { email });
      Alert.alert(error.message);
      return { session: null, error };
    }

    if (!session) {
      logInfo('Auth', 'Sign up pending email verification', { email });
      Alert.alert('Please check your inbox for email verification!');
      return { session: null, error: null };
    }

    logInfo('Auth', 'Sign up succeeded', { userId: session.user?.id });
    return { session, error: null };
  } catch (error) {
    logError('Auth', 'Sign up threw an unexpected error', error, { email });
    return { session: null, error };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      logError('Auth', 'Sign out failed', error);
      return { error };
    }

    logInfo('Auth', 'Sign out succeeded');
    return { error: null };
  } catch (error) {
    logError('Auth', 'Sign out threw an unexpected error', error);
    return { error };
  }
}
