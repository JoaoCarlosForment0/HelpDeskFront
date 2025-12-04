import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateChamado() {
  const navigate = useNavigate();
  const [respostasUser, setRespostasUser] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    prioridade: "baixa",
  });

  const criaChamado = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/chamados/",
        respostasUser
      );
      console.log(response);
      alert("chamado criado com sucesso");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  function handleChange(element) {
    const { name, value } = element.target;
    setRespostasUser((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  return (
    <div>
      <input
        type="text"
        name="titulo"
        id="titulo"
        placeholder="Título Chamado"
        onChange={handleChange}
      />
      <input
        type="text"
        name="descricao"
        id="descricao"
        placeholder="Descrição Chamado"
        onChange={handleChange}
      />
      <input
        type="text"
        name="categoria"
        id="categoria"
        placeholder="Categoria"
        onChange={handleChange}
      />
      <select name="prioridade" onChange={handleChange}>
        <option value="baixa" defaultChecked>
          Baixa
        </option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>
      <button onClick={criaChamado}>Criar chamado</button>
    </div>
  );
}

export default CreateChamado;
