import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function CreateChamado() {
  const navigate = useNavigate();
  const [respostasUser, setRespostasUser] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    prioridade: "baixa",
  });
  const { criaUrl } = useContext(AuthContext);

  const criaChamado = async () => {
    try {
      const response = await axios.post(
        criaUrl("chamados/"),
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
    <div className="flex flex-col gap-5 w-[90vw] h-[60vh] min-h-[520px] bg-linear-122 from-[#1d1d1d] to-[#222222] max-w-[500px] rounded-lg p-15">
      <h1>Criar chamado</h1>
      <input
        type="text"
        name="titulo"
        id="titulo"
        placeholder="titulo"
        onChange={handleChange}
      />
      <input
        type="text"
        name="descricao"
        id="descricao"
        placeholder="descricao"
        onChange={handleChange}
      />
      <input
        type="text"
        name="categoria"
        id="categoria"
        placeholder="categoria"
        onChange={handleChange}
      />
      <select
        name="prioridade"
        id="prioridade"
        className=" p-2 border-2 border-black text-black rounded-md"
        onChange={handleChange}
      >
        <option value="" disabled>
          --selecione a prioridade--
        </option>
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>
      <button onClick={criaChamado}>Criar chamado</button>
    </div>
  );
}

export default CreateChamado;
