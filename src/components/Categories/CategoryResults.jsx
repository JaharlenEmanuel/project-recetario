import MealCard from "../MealCard";

export default function CategoryResults({
  meals,
  loading,
  error,
  selectedCategory,
}) {
  if (!selectedCategory)
    return (
      <div className="text-center py-8">
        <p className="text-gray-400 text-lg">
          Selecciona una categoría para ver recetas.
        </p>
      </div>
    );

  if (loading) return (
    <div className="text-center py-8">
      <p className="text-gray-400 text-lg">Cargando recetas...</p>
    </div>
  );

  if (error) return (
    <div className="text-center py-8">
      <p className="text-red-500 text-lg">Error: {error.message}</p>
    </div>
  );

  if (meals.length === 0) return (
    <div className="text-center py-8">
      <p className="text-gray-400 text-lg">
        No se encontraron recetas para esta categoría.
      </p>
    </div>
  );

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Recetas de {selectedCategory} ({meals.length})
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}