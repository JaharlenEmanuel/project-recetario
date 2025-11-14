import { Link } from "react-router-dom";

export default function MealCard({ meal }) {
  if (!meal) return null;

  return (
    <div
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

        {/* 🔥 ESTE LINK SI FUNCIONA CON TU COMPONENTE Receta */}
        <Link
          to={`/receta?id=${meal.idMeal}`}
          className="text-sm text-gray-500 mt-1 inline-block hover:text-black"
        >
          Ver detalles ➜
        </Link>
      </div>
    </div>
  );
}
