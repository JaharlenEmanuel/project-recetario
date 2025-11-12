import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-gray-500">
  <div className="mx-auto w-full max-w-7xl p-4 py-6 lg:py-8">
    <div className="md:flex md:justify-between">
      <div className="mb-6 md:mb-0">
        <a href="https://flowbite.com/" className="flex items-center">
          <img
            src="/logo.png"
            className="h-8 me-3 rounded-xl"
            alt="FlowBite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            La casa de la Abuela
          </span>
        </a>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Resources
          </h2>
        </div>
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Follow us
          </h2>
        </div>
        <div>
          <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
            Legal
          </h2>
        </div>
      </div>
    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div className="sm:flex sm:items-center sm:justify-between">
      <span className="text-sm text-gray-800 sm:text-center">
        © 2023{" "}
        <a href="https://flowbite.com/" className="hover:underline">
          La casa de la Abuela
        </a>
        . All Rights Reserved.
      </span>
    </div>
  </div>
</footer>

  )
}
