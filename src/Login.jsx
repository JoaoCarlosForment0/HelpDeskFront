import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

function Login() {
  const { login, loading, user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if(!loading && user){
      navigate("/")
    }
  }, [loading, user]);
  const [inputs, setInputs] = useState({
    email: "",
    senha: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };
  const logarUsuario = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        inputs
      );
      await login(response.data.token);
      navigate("/");
    } catch (error) {
      console.log(err);
    }
  };
  return (
    <div className=" flex flex-col gap-5">
      <input
        type="text"
        name="email"
        id="email"
        placeholder="E-mail"
        onChange={handleChange}
      />
      <input
        type="password"
        name="senha"
        id="senha"
        placeholder="Senha"
        onChange={handleChange}
      />
      <button onClick={logarUsuario}>Entrar</button>
      <Link to="/cadastro" className="border-2 border-black p-2 rounded-md">
        Cadastrar
      </Link>
    </div>
  );
}

export default Login;
