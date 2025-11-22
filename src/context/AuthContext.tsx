// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState, type ReactNode, } from 'react';
import type { AuthState, UserProfile } from '../types/auth';

// Valor inicial
const initialAuthState: AuthState = {
    isAuthenticated: false,
    user: null,
    loading: true, // começa carregando para verificar token ao iniciar
};

// Cria o contexto
const AuthContext = createContext<{
    authState: AuthState;
    login: (token: string, user: UserProfile) => void;
    logout: () => void;
}>({
    authState: initialAuthState,
    login: () => { },
    logout: () => { },
});

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authState, setAuthState] = useState<AuthState>(initialAuthState);

    // Função de login
    const login = (token: string, user: UserProfile) => {
        localStorage.setItem('access_token', token);
        localStorage.setItem('user_profile', JSON.stringify(user));
        setAuthState({ isAuthenticated: true, user, loading: false });
    };

    // Função de logout
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_profile');
        setAuthState({ isAuthenticated: false, user: null, loading: false });
    };

    // Verifica se há token salvo ao carregar o app
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const userJson = localStorage.getItem('user_profile');

        if (token && userJson) {
            try {
                const user = JSON.parse(userJson) as UserProfile;
                setAuthState({ isAuthenticated: true, user, loading: false });
                return;
            } catch (e) {
                console.warn('Token ou perfil inválido no localStorage');
            }
        }
        setAuthState({ isAuthenticated: false, user: null, loading: false });
    }, []);

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado
export const useAuth = () => useContext(AuthContext);