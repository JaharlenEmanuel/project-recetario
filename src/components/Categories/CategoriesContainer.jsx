import { useState } from "react";
import { useFetchMeals } from "./useFetchMeals";
import CategoryButtons from "./CategoryButtons";
import CategoryResults from "./CategoryResults";

export default function CategoriesContainer() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // 🔹 Fetch de categorías
  const {
    data: categories,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetchMeals("https://www.themealdb.com/api/json/v1/1/categories.php");

  // 🔹 Fetch de recetas por categoría
  const {
    data: meals,
    loading: loadingMeals,
    error: errorMeals,
  } = useFetchMeals(
    selectedCategory
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      : null
  );

  return (
    <section className="w-full max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Categorías de Recetas
      </h2>

      <CategoryButtons
        data={categories}
        loading={loadingCategories}
        error={errorCategories}
        onSelect={setSelectedCategory}
      />

      <CategoryResults
        meals={meals}
        loading={loadingMeals}
        error={errorMeals}
        selectedCategory={selectedCategory}
      />
    </section>
  );
}

