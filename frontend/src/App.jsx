import {BrowserRouter, Routes, Route} from "react-router-dom"

import AdminHome from "./Pages/Admin/AdminDashboard.jsx";
import "./index.css";
import FuncionarioHome from "./Pages/Funcionario/FuncionarioHome.jsx"; // seu css
import LoginScreen from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import AdminDashboard from "./Pages/Admin/AdminDashboard.jsx";
import Inventory from "./Pages/Admin/Inventory.jsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<LoginScreen/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/admin/home" element={<AdminDashboard/>}></Route>
              <Route path="/admin/inventory" element={<Inventory/>}></Route>
              <Route path="/funcionario/home" element={<FuncionarioHome/>}></Route>
              <Route path="/cliente/home" element={<AdminHome/>}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
