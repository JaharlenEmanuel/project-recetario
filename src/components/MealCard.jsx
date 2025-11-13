import { useNavigate } from "react-router-dom";

export default function MealCard({ meal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/receta?id=${meal.idMeal}`);
  };

  // Función para manejar errores de imagen
  const handleImageError = (e) => {
    e.target.src = '/placeholder-food.jpg'; // Ruta de tu imagen predeterminada
    e.target.alt = 'Imagen no disponible';
    e.target.classList.add('opacity-50'); // Opcional: reducir opacidad para indicar que es placeholder
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
      onClick={handleClick}
    >
      <img
        src={meal.strMealThumb || '/placeholder-food.jpg'}
        alt={meal.strMeal}
        onError={handleImageError}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {meal.strMeal}
        </h3>

        <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
          Ver Receta
        </button>
      </div>
    </div>
  );
}