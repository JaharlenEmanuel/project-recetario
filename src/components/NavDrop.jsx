import React, { useState } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "./useScrollToTop";

export default function NavDrop() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-black hover:bg-gray-200 transition"
      >
        {/* Ícono hamburguesa */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Menú dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-48 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-20">
          <ul className="py-2 text-gray-700">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 hover:bg-gray-100"

                onClick={() => {
                  useScrollToTop(); // 👈 volver arriba
                  setOpen(false);
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/categorie"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Categories
              </Link>
            </li>

          </ul>
        </div>
      )}
    </div>
  );
}



