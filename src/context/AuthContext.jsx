import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const apiUrl = import.meta.env.VITE_BACK_URL;
  const [user, setUser] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  const criaUrl = (rota) => {
    return `${apiUrl}/${rota}`;
  };

  const login = async (token) => {
    localStorage.setItem("tokenApi", token);
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

    const res = await axios.post(criaUrl("home"));
    setUser(res.data.user);
    setPerfil(res.data.perfil);
  };

  const logout = () => {
    localStorage.removeItem("tokenApi");
    delete axios.defaults.headers.common["authorization"];
    setUser(null);
    setPerfil(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenApi");

    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
    //Deixa o token salvo dentro do header do axios para toda requisição

    axios
      .post(criaUrl("home"))
      .then((res) => {
        setUser(res.data.user);
        setPerfil(res.data.perfil);
      })
      .catch(() => {
        setUser(null);
        setPerfil(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response && err.response.status == 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, perfil, loading, login, logout, criaUrl }}
    >
      {children}
    </AuthContext.Provider>
  );
}
