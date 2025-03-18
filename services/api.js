import { useAuth } from '../auth/AuthContext';

export const fetchUserProfile = async () => {
  console.log('fetching user profile');

  const { supabase } = useAuth(); // Get the current auth session

  const { data, error } = await supabase.from('profiles').select('*');

  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }

  return data;
};
