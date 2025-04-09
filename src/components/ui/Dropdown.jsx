'use client'
import React, { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger button */}
      <div className="flex items-center gap-1 text-base font-medium hover:text-gray-600 transition-colors duration-300 cursor-pointer">
        {trigger}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </div>

      {/* Dropdown content with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30
            }}
            className="fixed mt-2 w-48 rounded-md bg-base-200 shadow-lg ring-1 ring-black ring-opacity-5"
            style={{
              top: `${dropdownRef.current?.getBoundingClientRect().bottom}px`,
              left: `${dropdownRef.current?.getBoundingClientRect().left}px`,
            }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown; 