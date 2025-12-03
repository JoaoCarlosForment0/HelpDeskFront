import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (token) => {
    localStorage.setItem("tokenApi", token);
    axios.defaults.headers.common["authorization"] = `Bearer ${token}`;

    const res = await axios.post("http://localhost:3000/home");
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("tokenApi");
    delete axios.defaults.headers.common["authorization"];
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenApi");

    if (token) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
    }
    //Deixa o token salvo dentro do header do axios para toda requisição

    axios
      .post("http://localhost:3000/home")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
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
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
