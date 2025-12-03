import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function Home() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <h1>olá {user}</h1>
      <button onClick={logout}></button>
    </div>
  );
}

export default Home;
