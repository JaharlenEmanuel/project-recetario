export default function MealCard({ meal, onSelect }) {
  if (!meal) return null; // Evita errores si meal no llega correctamente

  const handleClick = () => {
    if (onSelect) onSelect(meal); // Permite conectar con la vista de detalles
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md overflow-hidden 
                 hover:scale-105 hover:shadow-xl transition-transform 
                 cursor-pointer group"
    >
      <img
        src={meal.strMealThumb}
        alt={`Imagen de ${meal.strMeal}`}
        className="w-full h-44 object-cover group-hover:opacity-90"
        loading="lazy"
      />
      <div className="p-3">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {meal.strMeal}
        </h3>
        <p className="text-sm text-gray-500 mt-1">Ver detalles ➜</p>
      </div>
    </div>
  );
}