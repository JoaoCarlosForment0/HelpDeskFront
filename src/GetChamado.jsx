import axios from "axios";
import { useEffect, useState } from "react";

function GetChamado({ rota }) {
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

  if(chamados.length < 1) {
    return <h1>Carregando</h1>
  }

  return (
    <div>
      {chamados.map((e) => {
        return <h1 key={e.id}>{e.titulo}</h1>;
      })}
    </div>
  );
}

export default GetChamado;
