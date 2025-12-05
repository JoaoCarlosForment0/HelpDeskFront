import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GetChamado({ rota }) {
  const navigate = useNavigate()
  const [chamados, setChamados] = useState([]);
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

  if (chamados.length < 1) {
    return <h1>Carregando</h1>;
  }
  
  function enviarPagAlter(chamado) {
    navigate("/alterar", {
      state: { dados: chamado }
    })
  }

  return (
    <div>
      {chamados.map((e) => {
        return (
          <div key={`div ${e.id}`}className="flex flex-row gap-5">
            <h1 key={e.id}>{e.titulo}</h1>
            <button key={`button ${e.id}`} onClick={()=>{enviarPagAlter(e)}}>Alterar</button>
          </div>
        );
      })}
    </div>
  );
}

export default GetChamado;
