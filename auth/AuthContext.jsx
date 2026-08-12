import React, { createContext, useState, useEffect, useContext } from 'react';

import { logError, logInfo } from '../utils/logger';
import { supabase } from './supabaseClient';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          logError('Auth', 'Failed to load session', error);
        }
        setSession(data.session);
        logInfo('Auth', 'Session loaded', {
          hasSession: Boolean(data.session),
          userId: data.session?.user?.id
        });
      } catch (error) {
        logError('Auth', 'Unexpected error loading session', error);
      } finally {
        setLoading(false);
      }
    }

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, nextSession) => {
        logInfo('Auth', 'Auth state changed', {
          event,
          hasSession: Boolean(nextSession),
          userId: nextSession?.user?.id
        });
        setSession(nextSession);
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading, supabase }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
