import React from 'react'

export default function useFecthCategory() {
    const {
        data: categories,
        loading: loadingCategories,
        error: errorCategories,
    } = useFetchMeals("https://www.themealdb.com/api/json/v1/1/categories.php");
}
