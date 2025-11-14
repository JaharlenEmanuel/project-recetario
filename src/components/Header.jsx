import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavDrop from "./NavDrop";

export default function Header() {
  const location = useLocation();

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      // Si ya estamos en Home, recargar la página
      e.preventDefault(); // Evita el comportamiento normal del link
      window.location.reload();
    }
    // Si no, deja que Link navegue normalmente
  };

  const scrollToCategories = () => {
    window.scrollTo({
      top: 450,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <header className="w-full h-28 flex items-center justify-between fixed top-0 left-0 z-9999 gap-4 bg-[#D87800] px-8 text-white">
      <img className="bg-white h-24 rounded-2xl" src="/logo.png" alt="" />

      <h1 className="font-bold text-3xl">Recetas de la abuela</h1>

      <div className="md:hidden">
        <NavDrop />
      </div>

      <nav className="md:flex md:gap-8 md:font-bold hidden">
        <Link
          to="/"
          onClick={handleHomeClick}
          className="hover:bg-white hover:text-red-800 p-2 rounded-2xl"
        >
          Home
        </Link>

        <button
          onClick={scrollToCategories}
          className="hover:bg-white hover:text-red-800 p-2 rounded-2xl"
        >
          Categories
        </button>

        <button
          onClick={scrollToBottom}
          className="hover:bg-white hover:text-red-800 p-2 rounded-2xl"
        >
          Contactanos
        </button>
      </nav>
    </header>
  );
}
