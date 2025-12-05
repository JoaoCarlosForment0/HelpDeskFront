import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import GetChamado from "./GetChamado";

function Home() {
  const { user, logout, perfil} = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <h1>olá {user}</h1>
      <button onClick={logout}>Logout</button>
      <button onClick={()=>{navigate("/criarChamado")}}>Criar chamado</button>
      <h2>Chamados Propio</h2>
      <GetChamado rota="http://localhost:3000/chamados/"/>
      {perfil === "tecnico" ? <h2>Chamados gerais</h2> : null}
      {perfil === "tecnico" ? <GetChamado rota="http://localhost:3000/chamados/all"/> : null}
    </div>
  );
}

export default Home;
