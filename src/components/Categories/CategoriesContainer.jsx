import { useState } from "react";
import { useFetchMeals } from "./useFetchMeals";
import { useScrollToSection } from "../useScrollToSection";
import useFetch from "../../Hooks/useFetch";
import CategoryButtons from "./CategoryButtons";
import CategoryResults from "./CategoryResults";


export default function CategoriesContainer() {
  const [selectedCategory, setSelectedCategory] = useState(null);
    const { sectionRef, scrollToSection } = useScrollToSection();



  const {
    data: categoriesData,
    loading: loadingCategories,
    error: errorCategories
  } = useFetch("https://www.themealdb.com/api/json/v1/1/categories.php");


  const {
    data: mealsData,
    loading: loadingMeals,
    error: errorMeals
  } = useFetch(
    selectedCategory
      ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      : null
  );

  // Extraer las categorías del formato de la API
  const categories = categoriesData?.categories || [];

  // Extraer las comidas del formato de la API
  const meals = mealsData?.meals || [];

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <section ref={sectionRef} className="w-full max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-4">Categorías</h2>

      {/* Botones de categorías */}
      <CategoryButtons
        data={categories}
        loading={loadingCategories}
        error={errorCategories}
        onSelect={handleSelectCategory}
        selectedCategory={selectedCategory}
      />

      {/* Resultados de la categoría seleccionada */}
      <CategoryResults
        meals={meals}
        loading={loadingMeals}
        error={errorMeals}
        selectedCategory={selectedCategory}
      />
    </section>
  );
}