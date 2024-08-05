'use client'

import React from 'react'
import { useState } from 'react';
import { MdMoreHoriz } from "react-icons/md";
export default function SeeMore() {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>

      <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <MdMoreHoriz className="w-5 h-5 relative" aria-hidden="true" />
        </button>

        {isOpen && (
          <div
            className="fixed  z-50 flex items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="absolute bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 w-48"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Option 1
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  Option 2
                </a>
              </div>
            </div>
          </div>
        )}
      </div>







    </div>
  )
}
