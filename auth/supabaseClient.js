import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alert } from 'react-native';

//Following
//https://supabase.com/docs/guides/auth/quickstarts/react-native

const supabaseUrl = 'https://eixiuqvoidxhxlnjnkfg.supabase.co';
// With RLS enabled, this is ok to push
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVpeGl1cXZvaWR4aHhsbmpua2ZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzMTc3MTMsImV4cCI6MjA1Njg5MzcxM30.SPeM3XKvDnZvgvg-YjhqAIyb1ffr-YPJjD5YdyVnENw'; // process.env.SUPABASE_KEY;

import { saveSession } from '../services/appStorage';
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});

// // Tells Supabase Auth to continuously refresh the session automatically
// // if the app is in the foreground. When this is added, you will continue
// // to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// // `SIGNED_OUT` event if the user's session is terminated. This should
// // only be registered once.
// AppState.addEventListener('change', (state) => {
//   if (state === 'active') {
//     supabase.auth.startAutoRefresh();
//   } else {
//     supabase.auth.stopAutoRefresh();
//   }
// });

export async function signInWithEmail(email, password) {
  const {
    data: { session },
    error
  } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) Alert.alert(error.message);
  console.log(session);

  if (!session) {
    console.error('No session:', e);
  }

  try {
    saveSession(session);
  } catch (e) {
    console.error('Failed to save session:', e);
  }
  return session;
}

export async function signUpWithEmail(email, password) {
  const {
    data: { session },
    error
  } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) Alert.alert(error.message);
  if (!session) {
    Alert.alert('Please check your inbox for email verification!');
    return null;
  } else {
    saveSession(session);
    return session;
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error:', error.message);
  } else {
    console.log('User logged out.');
  }
}

// async function signUp(email, password) {
//   const { user, error } = await supabase.auth.signUp({
//     email,
//     password
//   });
//   if (error) {
//     console.error('Signup error:', error.message);
//   } else {
//     console.log('User signed up:', user);
//   }
// }

// async function signIn(email, password) {
//   const { session, error } = await supabase.auth.signIn({
//     email,
//     password
//   });
//   if (error) {
//     console.error('Login error:', error.message);
//   } else {
//     console.log('User logged in:', session);
//   }
// }
