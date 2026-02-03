import {BrowserRouter, Routes, Route} from "react-router-dom"

import AdminHome from "./Pages/Admin/AdminHome.jsx";
import "./index.css";
import FuncionarioHome from "./Pages/Funcionario/FuncionarioHome.jsx"; // seu css
import LoginScreen from "./Pages/Login.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<LoginScreen/>}/>
              <Route path="/admin/home" element={<AdminHome/>}></Route>
              <Route path="/funcionario/home" element={<FuncionarioHome/>}></Route>
              <Route path="/cliente/home" element={<AdminHome/>}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
