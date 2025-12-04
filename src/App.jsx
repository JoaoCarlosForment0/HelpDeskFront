import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import CreateChamado from "./CreateChamado";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/"
            element={<PrivateRoute element={Home} />}
          />
          <Route
            path="/criarChamado"
            element={<PrivateRoute element={CreateChamado} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
