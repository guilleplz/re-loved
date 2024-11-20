/**
 * Este hook proporciona una interfaz para autenticar usuarios 
 * en la aplicación. Utiliza el servicio de autenticación para
 * realizar las operaciones de login, registro y logout.
 * S e utiliza jsonwebtoken para autenticar a los usuarios.
 */

import React, { createContext, useContext, useState, ReactNode } from "react";
import authService from "../services/authservices"; // Asegúrate de que este servicio esté correctamente implementado

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password });
    setUser(response.user); // Asigna el usuario autenticado
    localStorage.setItem("token", response.token); // Guarda el token en localStorage
  };

  const register = async (email: string, password: string) => {
    await authService.register({ email, password });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};