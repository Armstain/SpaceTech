'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div 
      className="relative z-50" 
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger button */}
      <div className="flex items-center gap-1 text-base font-medium hover:text-gray-600 transition-colors duration-300 cursor-pointer">
        {trigger}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {/* Dropdown content */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 rounded-md bg-base-200 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 translate-y-0 visible'
            : 'opacity-0 -translate-y-2 invisible'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown; 