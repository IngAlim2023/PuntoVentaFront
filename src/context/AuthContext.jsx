import { createContext, useState, useContext, useEffect } from "react";
import { usuarioLogin, usuarioLogout, verifyToken } from "../api/login.api.js";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro del proveedor AuthContext");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  const singup = async (user) => {
    try {
      const res = await usuarioLogin(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      toast.error("Error al iniciar sesión");
    }
  };
  const singout = async () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      await usuarioLogout();
    } catch (error) {
      console.error(error);
      toast.error("Error al cerrar sesión");
    } finally {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();
      
      if (cookies.token) {
        try {
          const res = await verifyToken(cookies.token);
          if (!res.data) setIsAuthenticated(false);

          setIsAuthenticated(true);
          setUser(res.data);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
        } 
      }
    }
    checkLogin();
  }, []);


  return (
    <AuthContext.Provider
      value={{
        singup,
        singout,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
