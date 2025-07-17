import { supabase } from './supabase/client';
import { Profile } from './supabase/types';

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const getUserProfile = async (): Promise<Profile | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return profile;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signUp = async (email: string, password: string, fullName: string, role = 'user') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role,
      },
    },
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const isSubscribed = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (!profile) return false;

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', profile.id)
    .single();

  return subscription?.status === 'active';
};

export const isAdmin = async (): Promise<boolean> => {
  const profile = await getUserProfile();
  return profile?.role === 'admin';
};