'use client'
import { useState, useEffect } from 'react'
import NavbarOffer from "./NavbarOffer"
import NavbarMenu from "./NavbarMenu"
import NavbarMain from "./NavbarMain"

const Navbar = () => {
  const [showOffer, setShowOffer] = useState(true)
  const [showMenu, setShowMenu] = useState(true)
  const [showMain, setShowMain] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const controlNavbar = () => {
    const scrollThreshold1 = 300  // First threshold for Offer
    const scrollThreshold2 = 600 // Second threshold for Menu
    const scrollThreshold3 = 900 // Third threshold for Main

    if (window.scrollY > lastScrollY) { // if scroll down
      setShowOffer(window.scrollY <= scrollThreshold1)
      setShowMenu(window.scrollY <= scrollThreshold2)
      setShowMain(window.scrollY <= scrollThreshold3)
    } else { // if scroll up
      setShowMain(window.scrollY <= scrollThreshold3)
      setShowMenu(window.scrollY <= scrollThreshold2)
      setShowOffer(window.scrollY <= scrollThreshold1)
    }
    setLastScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <div className="mx-auto">
      {showOffer && <NavbarOffer />}
      {showMenu && <NavbarMenu />}
      {showMain && <NavbarMain />}
    </div>
  )
}

export default Navbar
