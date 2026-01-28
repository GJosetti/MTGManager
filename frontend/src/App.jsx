import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Pages/Login.jsx";
import Home from "./Pages/Home.jsx";
import "./index.css"; // seu css


function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/home" element={<Home/>}></Route>
          </Routes>
      </BrowserRouter>
  )
}

export default App
