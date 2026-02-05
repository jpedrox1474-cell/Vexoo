import React, { createContext, useState, useContext, useEffect } from 'react';
import { adminApi } from '@/api/adminApi';
import { signInWithGoogle, signInWithEmail, signUpWithEmail } from '@/lib/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [authError, setAuthError] = useState(null);

  const CURRENT_USER_KEY = 'vexo_current_session';

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    setIsLoadingAuth(true);
    try {
      const session = localStorage.getItem(CURRENT_USER_KEY);
      if (session) {
        setUser(JSON.parse(session));
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (e) {
      console.error('Auth state check failed:', e);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const getTrialInfo = (userData) => {
    if (!userData?.createdAt) {
      return { daysRemaining: 30, isExpired: false };
    }
    const createdDate = new Date(userData.createdAt);
    const today = new Date();
    const daysPassed = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.max(0, 30 - daysPassed);
    return {
      daysRemaining,
      isExpired: daysRemaining === 0,
      createdDate: createdDate.toLocaleDateString('pt-BR')
    };
  };

  const login = async (email, password) => {
    setIsLoadingAuth(true);
    setAuthError(null);

    try {
      const firebaseUser = await signInWithEmail(email, password);

      // Use the new syncUser API to handle creation/update centrally
      const localUser = await adminApi.syncUser({
        email: firebaseUser.email,
        full_name: firebaseUser.displayName || email.split('@')[0],
        provider: 'password'
      });

      const sessionUser = { ...localUser };
      delete sessionUser.password;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      setIsAuthenticated(true);
      return sessionUser;
    } catch (err) {
      console.error(err);
      setAuthError(err.message || 'Falha ao entrar.');
      throw err;
    } finally {
      setIsLoadingAuth(false);
    }
  };


  const loginWithGoogle = async () => {
    setIsLoadingAuth(true);
    setAuthError(null);

    try {
      const firebaseUser = await signInWithGoogle();

      // Check if we're in mock mode
      if (firebaseUser.mock || !import.meta.env.VITE_FIREBASE_API_KEY) {
        console.warn('Using mock Google login - Firebase not configured');
      }

      // Use the new syncUser API to handle creation/update centrally
      const localUser = await adminApi.syncUser({
        email: firebaseUser.email,
        full_name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
        photo_url: firebaseUser.photoURL,
        provider: 'google'
      });

      const sessionUser = { ...localUser };
      delete sessionUser.password;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      setIsAuthenticated(true);
      return sessionUser;
    } catch (err) {
      console.error('Google login error:', err);
      const errorMessage = err.message || 'Falha ao autenticar com Google. Tente novamente.';
      setAuthError(errorMessage);
      throw err;
    } finally {
      setIsLoadingAuth(false);
    }
  };


  const register = async (data) => {
    setIsLoadingAuth(true);
    setAuthError(null);
    try {
      const firebaseUser = await signUpWithEmail(data.email, data.password, data.full_name);
      const users = await adminApi.list('User');
      if (users.find(u => u.email === data.email)) {
        throw new Error('Este email já está cadastrado no sistema');
      }
      const newUser = await adminApi.create('User', {
        ...data,
        role: 'admin',
        status: 'active',
        provider: 'password',
        firebase_uid: firebaseUser?.uid,
        createdAt: new Date().toISOString()
      });
      const sessionUser = { ...newUser };
      delete sessionUser.password;
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      setIsAuthenticated(true);
      return sessionUser;
    } catch (err) {
      console.error(err);
      setAuthError(err.message || 'Erro ao criar conta');
      throw err;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = (redirectUrl = null) => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
    setIsAuthenticated(false);
    if (redirectUrl) {
      window.location.href = redirectUrl;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      authError,
      login,
      loginWithGoogle,
      register,
      logout,
      getTrialInfo,
      navigateToLogin: () => window.location.href = '/Login',
      isLoadingPublicSettings: false
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
