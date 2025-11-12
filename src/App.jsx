import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Receta from './pages/Recetas';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Prueba from './components/Prueba';


function App() {
  return (
   
      <div className="App min-h-screen bg-gray-50">
           <Header />
        
        <main className="pt-40">
          
          <Prueba />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/receta" element={<Receta />} />
          </Routes>
        </main>

        
        <Footer />
      </div>
  
  );
}

export default App;
