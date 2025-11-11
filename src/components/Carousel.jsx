import React, { useEffect, useState } from "react";

function Carousel() {
  const RANDOM_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const cacheKey = `carousel-/custom-random-carousel`;
    const cached = sessionStorage.getItem(cacheKey);

    if (cached) {
      setImages(JSON.parse(cached));
      return;
    }

    const fetchRandomMeals = async () => {
      try {
        const requests = Array.from({ length: 5 }, () =>
          fetch(RANDOM_URL).then((r) => r.json())
        );
        const responses = await Promise.all(requests);
        const meals = responses.map((r) => r.meals?.[0]).filter(Boolean);
        sessionStorage.setItem(cacheKey, JSON.stringify(meals));
        setImages(meals);
      } catch (err) {
        console.error("Error fetching random meals", err);
      }
    };

    fetchRandomMeals();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [images]);

  const currentImage = images[currentIndex];

  if (!currentImage) {
    return (
      <div className="relative w-[90%] max-w-md h-72 mx-auto mt-8 bg-[url('/images/bg-img-hero.jpg')] bg-cover bg-center rounded-3xl overflow-hidden shadow-lg">
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/25 p-4 rounded-3xl">
          <h2 className="text-2xl font-extrabold text-center text-white">
            ¡Bienvenidos!
          </h2>
          <p className="text-sm md:text-base text-center text-white mt-2">
            Es un placer contar con tu visita,
          </p>
          <p className="text-sm md:text-base text-center text-white">
            esperamos que puedas disfrutar de nuestras variedades.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[90%] max-w-md h-72 mx-auto mt-8 overflow-hidden rounded-3xl shadow-lg">
      <div
        key={currentImage.idMeal}
        className="absolute inset-0 w-full h-full transition-opacity duration-700 opacity-100 rounded-3xl"
      >
        <div
          className="w-full h-full bg-cover bg-center rounded-3xl"
          style={{
            backgroundImage: currentImage.strMealThumb
              ? `url("${currentImage.strMealThumb}")`
              : undefined,
            backgroundColor: currentImage.strMealThumb ? undefined : "#374151",
          }}
        >
          {/* Card centrada verticalmente */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[75%] flex flex-col items-center justify-center bg-black/50 rounded-3xl p-4 text-center">
            <h1 className="text-2xl md:text-4xl font-bold mb-4 text-white wrap-break-word">
              {currentImage.strMeal}
            </h1>
            <p className="text-sm md:text-lg text-white wrap-break-word">
              {currentImage.strArea} - {currentImage.strCategory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
