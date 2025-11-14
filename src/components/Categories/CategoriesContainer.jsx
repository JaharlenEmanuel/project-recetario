import { useState } from "react";
import { useFetchMeals } from "./useFetchMeals";
import CategoryButtons from "./CategoryButtons";
import CategoryResults from "./CategoryResults";

export default function CategoriesContainer() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    data: categoriesData,
    loading: loadingCategories,
    error: errorCategories,
  } = useFetchMeals("https://www.themealdb.com/api/json/v1/1/categories.php");

  const {
    data: mealsData,
    loading: loadingMeals,
    error: errorMeals,
  } = useFetchMeals(
    selectedCategory
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      : null
  );

  const categories = categoriesData?.categories || [];
  const meals = mealsData?.meals || [];

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-10 px-4 pb-24">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Categorías de Recetas
      </h2>

      <CategoryButtons
        data={categories}
        loading={loadingCategories}
        error={errorCategories}
        onSelect={handleSelectCategory}
        selectedCategory={selectedCategory}
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
