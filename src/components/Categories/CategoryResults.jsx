import MealCard from "../MealCard";

export default function CategoryResults({
  meals,
  loading,
  error,
  selectedCategory,
}) {
  if (!selectedCategory)
    return <p className="text-gray-400">Selecciona una categoría para ver recetas.</p>;

  if (loading) return <p className="text-gray-400">Cargando recetas...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
