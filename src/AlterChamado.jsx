import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AlterChamado() {
  const { state } = useLocation();
  const [respostasUser, setRespostasUser] = useState({
    titulo: "",
    descricao: "",
    categoria: "",
    prioridade: "baixa",
  });
  const navigate = useNavigate();
  const dados = state?.dados;

  useEffect(() => {
    setRespostasUser({
      titulo: dados.titulo,
      descricao: dados.descricao,
      categoria: dados.categoria,
      prioridade: dados.prioridade,
    });
  }, []);

  function handleChange(element) {
    const { name, value } = element.target;
    setRespostasUser((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  const alteraChamado = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/chamados/${dados.id}`,
        respostasUser
      );
      alert("Chamado Alterado!");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (dados) {
    return (
      <div className="flex flex-col gap-5">
        <input
          type="text"
          name="titulo"
          id="titulo"
          placeholder="Título Chamado"
          onChange={handleChange}
          value={respostasUser.titulo}
        />
        <input
          type="text"
          name="descricao"
          id="descricao"
          placeholder="Descrição Chamado"
          onChange={handleChange}
          value={respostasUser.descricao}
        />
        <input
          type="text"
          name="categoria"
          id="categoria"
          placeholder="Categoria"
          onChange={handleChange}
          value={respostasUser.categoria}
        />
        <select
          name="prioridade"
          onChange={handleChange}
          value={respostasUser.prioridade}
        >
          <option value="baixa" defaultChecked>
            Baixa
          </option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
        <button onClick={alteraChamado}>Alterar chamado</button>
      </div>
    );
  } else {
    return <h1>erro</h1>;
  }
}

export default AlterChamado;
