import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function useCarousel(url, cacheKey = "carousel-cache") {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      setImages(JSON.parse(cached));
      setIsLoading(false);
      return;
    }

    const fetchMeals = async () => {
      try {
        const requests = Array.from({ length: 10 }, () =>
          axios.get(url).then((r) => r.data)
        );
        const responses = await Promise.all(requests);
        const meals = responses.map((r) => r.meals?.[0]).filter(Boolean);

        await Promise.all(
          meals.map(
            (meal) =>
              new Promise((resolve) => {
                const img = new Image();
                img.src = meal.strMealThumb;
                img.onload = resolve;
                img.onerror = resolve;
              })
          )
        );

        sessionStorage.setItem(cacheKey, JSON.stringify(meals));
        setImages(meals);
      } catch (err) {
        console.error("Error fetching meals:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, [url, cacheKey]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  useEffect(() => {
    if (images.length > 0) {
      startAutoSlide();
      return () => stopAutoSlide();
    }
  }, [images]);

  const goToSlide = (index) => {
    stopAutoSlide();
    setCurrentIndex(index);
    startAutoSlide();
  };

  return { images, currentIndex, isLoading, goToSlide };
}
