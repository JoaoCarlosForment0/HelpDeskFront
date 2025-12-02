import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    axios.post("http://localhost:3000/home",{}, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("tokenApi")}`,
      },
    }).then((res)=>{console.log(res.data.user)});
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/"
            element={<PrivateRoute element={Home} isAuthenticated={true} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
