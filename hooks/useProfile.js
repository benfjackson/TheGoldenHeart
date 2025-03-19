import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';

export const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { supabase } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setError(error);
      } else {
        setProfile(data);
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, [supabase]);

  return { profile, loading, error };
};
