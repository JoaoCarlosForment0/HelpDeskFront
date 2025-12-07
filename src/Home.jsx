import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useNavigate } from "react-router-dom";
import GetChamado from "./GetChamado";

function Home() {
  const { user, logout, perfil, criaUrl } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="w-screen flex flex-col justify-center gap-5 items-start p-5">
      <div className="flex flex-row justify-center items-center h-[90%] gap-5 p-3 bg-linear-122 from-[#1d1d1d] to-[#222222] rounded-xl">
        <h2 className="text-3xl">Bem vindo, {user}!</h2>
        <button
          onClick={() => {
            navigate("/criarChamado");
          }}
          className="button-home"
        >
          Criar chamado
        </button>
        <button onClick={logout} className="button-home">
          Logout
        </button>
      </div>
      <div className="flex flex-row w-full justify-around bg-linear-122 gap-20 from-[#1d1d1d] to-[#222222] p-10 rounded-xl">
        <div className="flex flex-col gap-5 w-full rounded-md p-5 bg-[#232323]">
          <h2 className="text-3xl">
            Chamados {perfil === "tecnico" ? "do usuário" : null}
          </h2>
          <GetChamado rota={criaUrl("chamados/")} />
        </div>
        {perfil === "tecnico" ? (
          <div className="flex flex-col gap-5 w-full rounded-md p-5 bg-[#232323]">
            <h2 className="text-3xl">Chamados gerais</h2>
            <GetChamado rota={criaUrl("chamados/all")}/>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Home;
