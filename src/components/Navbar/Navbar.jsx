'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import NavbarOffer from "./NavbarOffer"
import NavbarMenu from "./NavbarMenu"
import NavbarMain from "./NavbarMain"

const Navbar = () => {
  const [showOffer, setShowOffer] = useState(true)
  const [showMenu, setShowMenu] = useState(true)
  const { scrollY } = useScroll()
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Hide offer when scrolling down more than 300px
    if (latest > 300) {
      setShowOffer(false)
    } else {
      setShowOffer(true)
    }
    
    // Hide menu after offer, at 500px
    if (latest > 600) {
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }
  })

  const offerHeight = showOffer ? 35 : 0
  const menuHeight = showMenu ? 65 : 0
  const mainHeight = 64

  return (
    <>
      <div style={{ height: `${offerHeight + menuHeight + mainHeight}px` }}></div>
      
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <motion.div 
          className="overflow-hidden"
          animate={{ height: showOffer ? '35px' : '0px' }}
          transition={{ duration: 0.3 }}
        >
          <NavbarOffer />
        </motion.div>
        
        <motion.div 
          className="overflow-hidden"
          animate={{ height: showMenu ? '65px' : '0px' }}
          transition={{ duration: 0.3 }}
        >
          <NavbarMenu />
        </motion.div>
        
        <div className="bg-white shadow-md">
          <NavbarMain />  
        </div>
      </div>
    </>
  )
}

export default Navbar
