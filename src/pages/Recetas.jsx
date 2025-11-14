import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../Hooks/useFetch";

export default function Receta() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const query = searchParams.get('q');
    const mealId = searchParams.get('id');

    const [selectedMeal, setSelectedMeal] = useState(null);

    // 🔹 Fetch para búsqueda por texto
    const {
        data: searchData,
        loading: searchLoading,
        error: searchError
    } = useFetch(
        query ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}` : null
    );

    // 🔹 Fetch para detalle de receta
    const {
        data: detailData,
        loading: detailLoading,
        error: detailError
    } = useFetch(
        mealId ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}` : null
    );

    // 🔹 Fetch para sugerencias (solo cuando hay una receta seleccionada)
    const {
        data: suggestionsData,
        loading: suggestionsLoading
    } = useFetch(
        selectedMeal ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedMeal.strCategory}` : null
    );

    // 🔹 Effect para manejar selectedMeal
    useEffect(() => {
        if (mealId && detailData?.meals?.[0]) {
            setSelectedMeal(detailData.meals[0]);
        } else if (query && searchData?.meals?.[0] && !mealId) {
            setSelectedMeal(searchData.meals[0]);
        } else if (!query && !mealId) {
            setSelectedMeal(null);
        }
    }, [mealId, detailData, query, searchData]);

    // 🔹 Determinar el estado de loading principal
    const isLoading = (query && searchLoading) || (mealId && detailLoading);

    // 🔹 Función para obtener ingredientes
    const getIngredients = (meal) => {
        const ingredients = [];
        if (!meal) return ingredients;

        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredients.push({
                    ingredient: ingredient.trim(),
                    measure: measure ? measure.trim() : ""
                });
            }
        }
        return ingredients;
    };

    // 🔹 Manejar selección de receta
    const handleSelectMeal = (meal) => {
        navigate(`/receta?id=${meal.idMeal}`);
    };

    // 🔹 Manejar nueva búsqueda
    const handleNewSearch = () => {
        navigate("/");
    };

    const meals = searchData?.meals || [];
    const suggestions = suggestionsData?.meals || [];

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={handleNewSearch}
                    className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors mb-4 px-4 py-2 border border-orange-200 rounded-lg hover:bg-orange-50"
                >
                    <span>←</span> Nueva Búsqueda
                </button>

                {query && !mealId && (
                    <h1 className="text-2xl font-bold text-gray-800">
                        Resultados para: "{query}"
                    </h1>
                )}
            </div>

            {/* 🔹 LOADING GENERAL */}
            {isLoading && (
                <div className="text-center py-12">
                    <div className="inline-flex items-center gap-3 bg-orange-100 text-orange-700 px-6 py-3 rounded-lg">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                        <p className="text-lg">Cargando recetas...</p>
                    </div>
                </div>
            )}

            {/* 🔹 ERRORES */}
            {(searchError || detailError) && (
                <div className="text-center py-8">
                    <p className="text-red-500 text-lg bg-red-50 px-4 py-2 rounded-lg">
                        Error al cargar los datos: {searchError?.message || detailError?.message}
                    </p>
                </div>
            )}

            {/* 🔹 VISTA DETALLE DE RECETA (solo cuando NO está loading) */}
            {!isLoading && selectedMeal && (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Columna izquierda - Detalle de receta */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                {selectedMeal.strMeal}
                            </h1>

                            <div className="grid md:grid-cols-2 gap-6 mb-6">
                                <img
                                    src={selectedMeal.strMealThumb || '/placeholder-food.jpg'}
                                    alt={selectedMeal.strMeal}
                                    onError={(e) => {
                                        e.target.src = '/placeholder-food.jpg';
                                        e.target.alt = 'Imagen no disponible';
                                    }}
                                    className="w-full h-80 object-cover rounded-lg shadow-md"
                                />

                                <div>
                                    <div className="space-y-3 mb-4">
                                        {selectedMeal.strCategory && (
                                            <p className="text-gray-600">
                                                <strong>Categoría:</strong> {selectedMeal.strCategory}
                                            </p>
                                        )}

                                        {selectedMeal.strArea && (
                                            <p className="text-gray-600">
                                                <strong>Origen:</strong> {selectedMeal.strArea}
                                            </p>
                                        )}
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-800 mb-3">Ingredientes</h2>
                                    <div className="space-y-2 max-h-60 overflow-y-auto">
                                        {getIngredients(selectedMeal).map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-2 bg-orange-50 rounded-lg"
                                            >
                                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                <span className="text-gray-700">
                                                    <strong>{item.measure}</strong> {item.ingredient}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {selectedMeal.strYoutube && (
                                        <a
                                            href={selectedMeal.strYoutube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors mt-4"
                                        >
                                            <span>🎥</span> Ver video en YouTube
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Instrucciones */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-800 mb-4">Instrucciones</h2>
                                <div className="prose max-w-none bg-orange-100 p-6 rounded-lg">
                                    {selectedMeal.strInstructions.split('\n').map((paragraph, index) => (
                                        paragraph.trim() && (
                                            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                                {paragraph}
                                            </p>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🔹 COLUMNA DERECHA - SUGERENCIAS */}
                    <div className="lg:col-span-1">
                        <div className="bg-[#D87800] rounded-lg shadow-lg p-6 sticky top-[170px]">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">
                                Más recetas de {selectedMeal.strCategory}
                            </h2>

                            {suggestionsLoading ? (
                                <div className="text-center py-4">
                                    <p className="text-gray-500">Cargando sugerencias...</p>
                                </div>
                            ) : (
                                <div className=" gap-4 flex flex-col">
                                    {suggestions.slice(0, 5).map((suggestion) => (
                                        <div
                                            key={suggestion.idMeal}
                                            className="bg-white flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-orange-300 hover:bg-green-500 cursor-pointer transition-colors"
                                            onClick={() => handleSelectMeal(suggestion)}
                                        >
                                            <img
                                                src={suggestion.strMealThumb}
                                                alt={suggestion.strMeal}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                                                    {suggestion.strMeal}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 🔹 VISTA RESULTADOS DE BÚSQUEDA (cuando hay query pero no receta seleccionada y NO está loading) */}
            {!isLoading && !selectedMeal && query && meals.length > 0 && (
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        {meals.length} recetas encontradas
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {meals.map((meal) => (
                            <div
                                key={meal.idMeal}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                                onClick={() => handleSelectMeal(meal)}
                            >
                                <img
                                    src={meal.strMealThumb}
                                    alt={meal.strMeal}
                                    className="w-full h-48 object-cover"
                                />

                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                                        {meal.strMeal}
                                    </h3>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {meal.strCategory && (
                                            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-sm">
                                                {meal.strCategory}
                                            </span>
                                        )}
                                        {meal.strArea && (
                                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                                                {meal.strArea}
                                            </span>
                                        )}
                                    </div>

                                    <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                                        Ver Receta
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* No results (solo cuando NO está loading) */}
            {!isLoading && query && meals.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg mb-2">No se encontraron recetas para "{query}"</p>
                    <button
                        onClick={handleNewSearch}
                        className="text-orange-500 hover:text-orange-600 underline"
                    >
                        Intentar con otra búsqueda
                    </button>
                </div>
            )}
        </div>
    );
}