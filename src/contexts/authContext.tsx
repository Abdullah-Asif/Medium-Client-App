import React, {createContext, useContext, useState} from "react";
import {SignInModel} from "../models/signInModel";
import AuthService from "../services/auth/authService";
import {SignUpModel} from "../models/SignUpModel";

interface AuthContextType {
    isLoggedIn: boolean;
    login:  (credentials: SignInModel) => Promise<any>;
    register: (signUpModel: SignUpModel) => Promise<void >;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType|undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default function AuthProvider ({children}: any) {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const user = AuthService.getCurrentUser();
        return !!user;
    });
    const login = async (credentials: SignInModel) => {
        try {
            const response = await AuthService.login(credentials);
            if (response){
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Login failed');
        }
    };

    const register = async (userData: SignUpModel) => {
        try {
            await AuthService.register(userData);
        }
        catch (error) {
            console.error('Registration error:', error);
            throw new Error('Registration failed');
        }
    };
    const logout = () => {
        AuthService.logOut();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};