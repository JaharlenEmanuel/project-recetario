export default function MealCard({ meal }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden hover:scale-105 hover:shadow-lg transition cursor-pointer">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover"
      />
      <h3 className="p-3 text-lg font-medium">{meal.strMeal}</h3>
    </div>
  );
}
