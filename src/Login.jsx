import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

function Login() {
  const { login, loading, user, criaUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && user) {
      navigate("/");
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
        criaUrl("auth/login"),
        inputs
      );
      await login(response.data.token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col gap-5 w-[90vw] h-[60vh] min-h-[450px] bg-linear-122 from-[#1d1d1d] to-[#222222] max-w-[500px] rounded-lg p-15">
      <h1>Bem vindo!</h1>
      <input
        type="text"
        name="email"
        id="email"
        placeholder="E-mail"
        onChange={handleChange}
        autoComplete="false"
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
