import React from 'react'
import { Link } from 'react-router'
import NavDrop from './NavDrop'
import { useScrollToSection } from './useScrollToSection'

export default function Header({ scrollToSection }) {

  return (
    <>
      <header className="w-full flex items-center justify-between fixed z-50 gap-4 bg-gray-500 p-8 text-white">
        
        <img
          className="bg-white h-24 rounded-2xl"
          src="/logo.png"
          alt=""
        />

        <h1 className='font-bold text-3xl'>Recetas de la abuela</h1>

        <div className="md:hidden">
            <NavDrop />
        </div>

       <nav className="md:flex md:gap-8 md:font-bold hidden">
          <button
            onClick={scrollToSection}
            className="hover:bg-white hover:text-red-800 p-2 rounded-2xl">
            Home
          </button>
          <button
            className="hover:bg-white hover:text-red-800 p-2 rounded-2xl"
            /* to="/Characters" */
            onClick={scrollToSection}
          >
            Categories
          </button>
          <Link
            className="hover:bg-white hover:text-red-800 p-2 rounded-2xl"
          
          >
            About us
          </Link>
        </nav>

      </header>
    </>
  )
}
