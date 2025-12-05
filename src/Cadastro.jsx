import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    nome: "",
    email: "",
    senha: "",
    perfil: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  };

  const cadastrarUsuario = () => {
    axios.post("http://localhost:3000/auth/register", inputs).then((response)=>{
        navigate("/");   
    },(response) => {
        alert( response.status + ": Usuario já existe")
    });
    console.log(inputs);
  };
  return (
    <div className="flex flex-col gap-5 w-[90vw] h-[60vh] bg-linear-122 from-[#1d1d1d] to-[#222222] max-w-[500px] rounded-lg p-15">
      <h1>Cadastrar</h1>
      <input type="text" name="nome" id="nome"  placeholder="nome" onChange={handleChange} />
      <input type="text" name="email" id="email" placeholder="email" onChange={handleChange} />
      <input type="password" name="senha" id="senha" placeholder="senha" onChange={handleChange} />
      <select
        name="perfil"
        id="perfil"
        className=" p-2 border-2 border-black text-black rounded-md"
        onChange={handleChange}
      >
        <option value="" disabled>--selecione um perfil--</option>
        <option value="usuario">Usuário</option>
        <option value="tecnico">Técnico</option>
      </select>
      <button onClick={cadastrarUsuario}>Cadastrar</button>
    </div>
  );
}

export default Cadastro;
