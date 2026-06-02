'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

interface AuthContextType {
  user: any | null; // Supports mock session object as well
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loginManually: (username: string, email: string) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGoogle: async () => {},
  signOut: async () => {},
  loginManually: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if a local mock session exists first
    const mockUserString = localStorage.getItem('sms_mock_user');
    if (mockUserString) {
      setUser(JSON.parse(mockUserString));
      setLoading(false);
      return;
    }

    // Check active sessions and sets the user via Supabase
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // If a mock user is active, bypass Supabase callbacks
        if (localStorage.getItem('sms_mock_user')) return;
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const pendingData = localStorage.getItem('sms_pending_profile_data');
      if (pendingData) {
        localStorage.setItem(`sms_profile_data_${user.id}`, pendingData);
        localStorage.removeItem('sms_pending_profile_data');
      }
    }
  }, [user]);

  const signInWithGoogle = async () => {
    localStorage.removeItem('sms_mock_user');
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
  };

  const loginManually = (username: string, email: string) => {
    const mockUser = {
      id: 'mock-uuid-123456789',
      email: email || 'observer@sandmatters.org',
      user_metadata: {
        full_name: username || 'Civic Observer'
      }
    };
    setUser(mockUser);
    localStorage.setItem('sms_mock_user', JSON.stringify(mockUser));
  };

  const signOut = async () => {
    localStorage.removeItem('sms_mock_user');
    setUser(null);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, signOut, loginManually }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
