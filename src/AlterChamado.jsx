import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function AlterChamado() {
  const { state } = useLocation();
  const { criaUrl } = useContext(AuthContext);
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
        criaUrl(`chamados/${dados.id}`),
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
      //   <div className="flex flex-col gap-5 w-[90vw] h-[60vh] min-h-[520px] bg-linear-122 from-[#1d1d1d] to-[#222222] max-w-[500px] rounded-lg p-15">
      //   <h1>Cadastrar</h1>
      //   <input
      //     type="text"
      //     name="titulo"
      //     id="titulo"
      //     placeholder="titulo"
      //     onChange={handleChange}
      //   />
      //   <input
      //     type="text"
      //     name="descricao"
      //     id="descricao"
      //     placeholder="descricao"
      //     onChange={handleChange}
      //   />
      //   <input
      //     type="password"
      //     name="categoria"
      //     id="categoria"
      //     placeholder="categoria"
      //     onChange={handleChange}
      //   />
      //   <select
      //     name="prioridade"
      //     id="prioridade"
      //     className=" p-2 border-2 border-black text-black rounded-md"
      //     onChange={handleChange}
      //   >
      //     <option value="" disabled>
      //       --selecione a prioridade--
      //     </option>
      //     <option value="baixa">Baixa</option>
      //     <option value="media">Média</option>
      //     <option value="alta">Alta</option>
      //   </select>
      //   <button onClick={criaChamado}>Criar chamado</button>
      // </div>

      <div className="flex flex-col gap-5 w-[90vw] h-[60vh] min-h-[520px] bg-linear-122 from-[#1d1d1d] to-[#222222] max-w-[500px] rounded-lg p-15">
        <input
          type="text"
          name="titulo"
          id="titulo"
          placeholder="Título Chamado"
          onChange={handleChange}
          value={respostasUser.titulo}
          className="input-alter"
        />
        <input
          type="text"
          name="descricao"
          id="descricao"
          placeholder="Descrição Chamado"
          onChange={handleChange}
          value={respostasUser.descricao}
          className="input-alter"
        />
        <input
          type="text"
          name="categoria"
          id="categoria"
          placeholder="Categoria"
          onChange={handleChange}
          value={respostasUser.categoria}
          className="input-alter"
        />
        <select
          name="prioridade"
          onChange={handleChange}
          value={respostasUser.prioridade}
          className="input-alter"
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
