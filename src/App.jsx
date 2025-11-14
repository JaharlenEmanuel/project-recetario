import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Receta from './pages/Recetas';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import CategoriesContainer from './components/Categories/CategoriesContainer';

function App() {

  return (

    <div className="App min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="grow pt-40">


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorie" element={<CategoriesContainer />} />
          <Route path="/receta" element={<Receta />} />

        </Routes>

      </main>
      <Footer />
    </div>

  );
}

export default App;
