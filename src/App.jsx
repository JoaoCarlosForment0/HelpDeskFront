import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Cadastro from './Cadastro';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/cadastro' element={<Cadastro/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
