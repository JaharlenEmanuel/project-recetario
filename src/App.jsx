import React from 'react'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Footer from './components/Footer'
import Prueba from './components/Prueba'

export default function App() {
  return (
    <div>
      <Header />

      <div className="pt-40">
      <Prueba />
      <Routes>

      </Routes>
      </div>
      
      <Footer />
    </div>
  )
}
