'use client'
import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = ({ trigger, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef(null);
  const contentRef = useRef(null);
  
  //  debounce 
  const toggleTimeout = useRef(null);
  
  const handleMouseEnter = () => {
    clearTimeout(toggleTimeout.current);
    toggleTimeout.current = setTimeout(() => setIsOpen(true), 50);
  };
  
  const handleMouseLeave = () => {
    clearTimeout(toggleTimeout.current);
    toggleTimeout.current = setTimeout(() => setIsOpen(false), 100);
  };
  
  // Calculate position once when opening
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const triggerRect = dropdownRef.current.getBoundingClientRect();
      const contentRect = contentRef.current?.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      
      let left = triggerRect.left;
      
      // If dropdown would extend beyond right edge of window, align to right
      if (contentRect && left + contentRect.width > windowWidth - 10) {
        left = Math.max(10, triggerRect.right - contentRect.width);
      }
      
      setPosition({
        top: triggerRect.bottom,
        left: left,
      });
    }
  }, [isOpen]);

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger button */}
      <div className="flex items-center gap-1 text-base font-medium hover:text-gray-600 transition-colors duration-300 cursor-pointer px-2">
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
            ref={contentRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30
            }}
            className="fixed mt-2 w-fit rounded-md bg-base-200 shadow-lg ring-1 ring-black ring-opacity-5"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
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