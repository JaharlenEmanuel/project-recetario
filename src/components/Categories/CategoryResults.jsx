import MealCard from "../MealCard";

export default function CategoryResults({
  meals,
  loading,
  error,
  selectedCategory,
}) {
  // 🔹 Si no se ha seleccionado categoría aún
  if (!selectedCategory) {
    return (
      <p className="text-gray-400 text-center">
        Selecciona una categoría para ver las recetas.
      </p>
    );
  }

  // 🔹 Mientras carga los datos
  if (loading) {
    return <p className="text-gray-400 text-center">Cargando recetas...</p>;
  }

  // 🔹 Si ocurre un error
  if (error) {
    return (
      <p className="text-red-500 text-center">
        Ocurrió un error: {error}
      </p>
    );
  }

  // 🔹 Si no hay resultados
  if (!meals || meals.length === 0) {
    return (
      <p className="text-gray-500 text-center">
        No se encontraron recetas para esta categoría.
      </p>
    );
  }

  // 🔹 Renderizado de los resultados
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {meals.map((meal) => (
        <MealCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
