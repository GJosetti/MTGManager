import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./Pages/Login.jsx";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
