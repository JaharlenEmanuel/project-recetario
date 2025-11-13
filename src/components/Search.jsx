import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Hooks/useFetch";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [searchUrl, setSearchUrl] = useState(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const navigate = useNavigate();

    // 🔹 Effect para búsqueda en tiempo real (sugerencias)
    useEffect(() => {
        if (!query.trim()) {
            setSearchUrl(null);
            setShowSuggestions(false);
            return;
        }

        const timer = setTimeout(() => {
            setSearchUrl(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
            );
            setShowSuggestions(true);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const { data, loading, error } = useFetch(searchUrl);
    const meals = data?.meals || [];

    // 🔹 Manejar búsqueda con Enter
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/receta?q=${encodeURIComponent(query)}`);
            setQuery("");
            setShowSuggestions(false);
        }
    };

    // 🔹 Manejar click en sugerencia
    const handleSuggestionClick = (meal) => {
        navigate(`/receta?id=${meal.idMeal}`);
        setQuery("");
        setShowSuggestions(false);
    };

    return (
        <div className="p-4 w-full max-w-md mx-auto relative">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Buscar receta por nombre..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => query.trim() && setShowSuggestions(true)}
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            </form>

            {/* Loading y Error */}
            {loading && <p className="text-gray-500 mt-2">Buscando recetas...</p>}
            {error && <p className="text-red-500 mt-2">Error al cargar datos.</p>}

            {/* Sugerencias */}
            {showSuggestions && meals.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-lg mt-2 max-h-80 overflow-y-auto z-40 divide-y border">
                    {meals.slice(0, 5).map((meal) => (
                        <div
                            key={meal.idMeal}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 cursor-pointer"
                            onClick={() => handleSuggestionClick(meal)}
                        >
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className="w-10 h-10 object-cover rounded"
                            />
                            <div className="flex-1">
                                <span className="text-gray-800">{meal.strMeal}</span>
                                {meal.strCategory && (
                                    <p className="text-xs text-gray-500">{meal.strCategory}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* No results */}
            {!loading && !error && query.trim() && meals.length === 0 && (
                <p className="text-gray-500 mt-2">No se encontraron recetas.</p>
            )}
        </div>
    );
}