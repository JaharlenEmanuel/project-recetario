import React from "react";
import { useNavigate } from "react-router-dom";
import useCarousel from "../Hooks/useCarousel";

function Carousel() {
  const RANDOM_URL = "https://www.themealdb.com/api/json/v1/1/random.php";
  const { images, currentIndex, isLoading, goToSlide } =
    useCarousel(RANDOM_URL);

  const navigate = useNavigate(); 


  const handleGoToRecipe = (idMeal) => {
    navigate(`/receta?id=${idMeal}`);
  };

  if (isLoading || images.length === 0) {
    return (
      <div className="relative w-full sm:w-[90%] sm:max-w-md h-64 mx-auto mt-8 bg-[url('/images/bg-img-hero.jpg')] bg-cover bg-center rounded-3xl overflow-hidden shadow-lg">
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
    <div className="relative w-full sm:w-[90%] md:w-[80%] lg:w-[70%] sm:max-w-md md:max-w-lg lg:max-w-2xl h-72 md:h-80 lg:h-84 mx-auto mt-8 overflow-hidden shadow-lg group rounded-3xl">
      {images.map((image, index) => (
        <div
          key={image.idMeal}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url("${image.strMealThumb}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/25 p-4 text-center">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white wrap-break-words">
                {image.strMeal}
              </h1>
              <p className="text-sm md:text-lg lg:text-xl text-white wrap-break-words">
                {image.strArea} - {image.strCategory}
              </p>
            </div>

            {index === currentIndex && (
              <button
                onClick={() => handleGoToRecipe(image.idMeal)}
                className="px-5 py-2 mb-5 bg-orange-500 text-white font-bold rounded-lg transition-transform duration-150 hover:bg-orange-600 active:scale-95 text-sm md:text-base lg:text-lg"
              >
                Ver Receta
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-50">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full border border-white transition-all duration-300 ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-gray-400 hover:bg-white/70"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
