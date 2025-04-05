'use client'
import { useState, useEffect } from 'react'
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
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [])

  // Calculate heights for positioning
  const offerHeight = showOffer ? 'h-[40px]' : 'h-0'
  const menuHeight = showMenu ? 'h-[65px]' : 'h-0'
  const mainTop = `${showOffer ? 40 : 0}${showMenu ? 80 : 0}px`

  return (
    <>
      {/* Space holder for the fixed navbar */}
      <div className={`${offerHeight} ${menuHeight} h-[64px]`}></div>
      
      <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
        <div className={`overflow-hidden transition-all duration-300 ${offerHeight}`}>
          <NavbarOffer />
        </div>
        <div className={`overflow-hidden transition-all duration-300 ${menuHeight}`}>
          <NavbarMenu />
        </div>
        <div className="bg-white shadow-md">
          <NavbarMain />
        </div>
      </div>
    </>
  )
}

export default Navbar
