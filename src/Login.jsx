import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
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
  const logarUsuario = () => {
    axios.post("http://localhost:3000/auth/login", inputs).then(
        (response) => {localStorage.setItem("tokenApi",response.data.token)}, (response) => {console.log("não passou eu acho "); } 
    )
  }
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
