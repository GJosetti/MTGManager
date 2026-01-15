import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Pages/Login.jsx";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from "./Pages/Home.jsx";

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
