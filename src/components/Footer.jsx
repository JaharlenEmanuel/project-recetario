import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-[#D87800] text-white">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Logo + título */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" className="h-10 rounded-xl" alt="Logo" />
          <span className="text-2xl font-semibold">
            La casa de la Abuela
          </span>
        </div>

        {/* Línea divisora */}
        <hr className="my-6 border-white/30" />

        {/* Copyright */}
        <div className="text-center text-sm">
          © 2023 La casa de la Abuela. All rights reserved.
        </div>
        
      </div>
    </footer>
  );
}

