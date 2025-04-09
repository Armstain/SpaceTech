'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavbarOffer from "./NavbarOffer"
import NavbarMenu from "./NavbarMenu"
import NavbarMain from "./NavbarMain"

const Navbar = () => {
  const [showOffer, setShowOffer] = useState(true)
  const [showMenu, setShowMenu] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    const scrollThreshold1 = 50  
    const scrollThreshold2 = 100 

    if (window.scrollY > lastScrollY) { // scrolling down
      setShowOffer(window.scrollY < scrollThreshold1)
      setShowMenu(window.scrollY < scrollThreshold2)
    } else { // scrolling up
      setShowOffer(true)
      setShowMenu(true)
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    // Throttle the scroll event for better performance
    let timeoutId = null;
    const handleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          controlNavbar();
          timeoutId = null;
        }, 10);
      }
    };

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) clearTimeout(timeoutId);
    }
  }, [lastScrollY])

  return (
    <>
      {/* Spacer element that maintains layout as navbar items hide/show */}
      <div style={{ height: `${(showOffer ? 40 : 0) + (showMenu ? 65 : 0) + 64}px` }}></div>
      
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <AnimatePresence>
          {showOffer && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 40, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              className="overflow-hidden"
            >
              <NavbarOffer />
            </motion.div>
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 65, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                delay: showOffer ? 0.1 : 0 
              }}
              className="overflow-hidden"
            >
              <NavbarMenu />
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="bg-white shadow-md"
          animate={{ 
            y: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
          }}
        >
          <NavbarMain />  
        </motion.div>
      </div>
    </>
  )
}

export default Navbar
