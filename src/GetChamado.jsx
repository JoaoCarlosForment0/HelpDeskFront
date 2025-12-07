import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function GetChamado({ rota }) {
  const navigate = useNavigate();
  const [chamados, setChamados] = useState([]);
  const { loading, criaUrl } = useContext(AuthContext);
  useEffect(() => {
    const getChamados = async () => {
      try {
        const response = await axios.get(rota);
        setChamados(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChamados();
  }, []);

  if (loading) {
    return <h1>Carregando</h1>;
  } else if (chamados.length < 1) {
    return <h2 className=" text-gray-500">Sem chamados</h2>;
  }

  function enviarPagAlter(chamado) {
    navigate("/alterar", {
      state: { dados: chamado },
    });
  }

  async function apagaChamado(id_chamado) {
    try {
      const response = await axios.delete(criaUrl(`chamados/${id_chamado}`));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {chamados.map((e) => {
        return (
          <div
            key={`div ${e.id}`}
            className="flex flex-row bg-[#272727] p-5 rounded-lg justify-between"
          >
            <div>
              <h2 className="text-gray-500">
                Título
              </h2>
              <h2 className="text-xl">
                {e.titulo}
              </h2>
              <h2 className="text-gray-500">
                Categoria
              </h2>
              <h2 className="text-xl">
                {e.categoria}
              </h2>
              <h2 className="text-gray-500">
                Prioridade
              </h2>
              <h2 className="text-xl">
                {e.prioridade}
              </h2>
            </div>
            <div className="flex flex-row gap-3">
              <button
                key={`button ${e.id}`}
                onClick={() => {
                  enviarPagAlter(e);
                }}
                className="button-home h-10"
              >
                Alterar
              </button>
              <button
                key={`button-remove ${e.id}`}
                onClick={() => {
                  apagaChamado(e.id);
                }}
                className="button-home h-10 p-2"
              >
                Remover
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default GetChamado;
