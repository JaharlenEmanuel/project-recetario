import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchBar from './components/Search';
import Receta from './pages/Recetas';
import Home from './pages/Home';


function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      {/* Header común con SearchBar */}
      <header className="bg-[#D87800] text-white p-4 shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-center mb-4">
            🍳 Recetario TheMealDB
          </h1>
          <SearchBar />
        </div>
      </header>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/receta" element={<Receta />} />
      </Routes>
    </div>

  );
}

export default App;