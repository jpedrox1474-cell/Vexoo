// Firebase Configuration
// Para usar o Firebase, você precisa criar um projeto em https://console.firebase.google.com/
// e habilitar o Google Authentication

import { initializeApp } from 'firebase/app';
import {
    getAuth, GoogleAuthProvider, signInWithPopup, signOut,
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

// Configuração do Firebase (substitua com suas credenciais)
const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key";
const isPlaceholderKey = apiKey === "demo-api-key" || apiKey === "INSIRA_SUA_API_KEY" || !apiKey || apiKey.startsWith("INSIRA");

const firebaseConfig = {
    apiKey: isPlaceholderKey ? "demo-api-key" : apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Register with Email/Password
export const signUpWithEmail = async (email, password, fullName) => {
    if (isPlaceholderKey) {
        console.warn("Using MOCK Registration because Firebase API key is not configured.");
        await new Promise(r => setTimeout(r, 1000));
        return {
            uid: Date.now().toString(),
            email: email,
            displayName: fullName
        };
    }

    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        if (fullName) {
            await updateProfile(result.user, { displayName: fullName });
        }
        return result.user;
    } catch (error) {
        console.error('Sign up error:', error);
        throw error;
    }
};

// Login with Email/Password
export const signInWithEmail = async (email, password) => {
    if (isPlaceholderKey) {
        console.warn("Using MOCK Login because Firebase API key is not configured.");
        await new Promise(r => setTimeout(r, 800));
        return {
            uid: "mock-" + email.replace(/[^a-zA-Z0-9]/g, "-"),
            email: email,
            displayName: email.split('@')[0],
            mock: true
        };
    }

    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user;
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
};

// Google Sign In
export const signInWithGoogle = async () => {
    // Check if we are using demo/placeholder keys
    if (isPlaceholderKey) {
        console.warn("Using MOCK Google Sign In because Firebase API key is not configured.");
        // Simulate a small delay for the "UX"
        await new Promise(r => setTimeout(r, 1200));

        // Return a mocked user object that matches Firebase User structure
        return {
            uid: "mock-user-123",
            email: "demo-user@example.com",
            displayName: "Usuário Demo",
            photoURL: "https://ui-avatars.com/api/?name=Usuario+Demo",
            mock: true
        };
    }

    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error('Google sign in error:', error);
        throw error;
    }
};

// Sign Out
export const firebaseSignOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Sign out error:', error);
        throw error;
    }
};
