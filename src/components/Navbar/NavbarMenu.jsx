'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Phone, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import Dropdown from '@/components/ui/Dropdown'

const navItems = [
  {
    label: 'Home',
    href: '/',
    type: 'link'
  },
  {
    label: 'Shop',
    type: 'dropdown',
    items: [
      { href: '/shop/category-1', label: 'Category 1' },
      { href: '/shop/category-2', label: 'Category 2' }
    ]
  },
  {
    label: 'Collection',
    type: 'dropdown',
    items: [
      { href: '/collection/new', label: 'New Arrivals' },
      { href: '/collection/featured', label: 'Featured' }
    ]
  },
  {
    label: 'Blog',
    href: '/blog',
    type: 'link'
  }
]

const NavbarMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openMobileDropdowns, setOpenMobileDropdowns] = useState({})

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    // Reset dropdowns when closing menu
    if (isMenuOpen) {
      setOpenMobileDropdowns({})
    }
  }

  const toggleMobileDropdown = (label) => {
    setOpenMobileDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }))
  }

  const renderNavItem = (item) => {
    if (item.type === 'link') {
      return (
        <Link
          key={item.href}
          href={item.href}
          className="text-base font-medium relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-gray-600 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full hover:text-gray-600"
        >
          {item.label}
        </Link>
      )
    }
    if (item.type === 'dropdown') {
      return (
        <Dropdown key={item.label} trigger={item.label}>
          <div className="py-2 z-100">
            {item.items.map((dropdownItem) => (
              <Link
                key={dropdownItem.href}
                href={dropdownItem.href}
                className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors duration-200"
              >
                {dropdownItem.label}
              </Link>
            ))}
          </div>
        </Dropdown>
      )
    }
  }

  const renderMobileNavItem = (item) => {
    if (item.type === 'link') {
      return (
        <Link
          key={item.href}
          href={item.href}
          className="block py-3 px-4 text-lg border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
          onClick={toggleMenu}
        >
          {item.label}
        </Link>
      )
    }
    if (item.type === 'dropdown') {
      const isOpen = openMobileDropdowns[item.label] || false
      
      return (
        <div key={item.label} className="border-b border-gray-100">
          <button 
            className="flex items-center justify-between w-full py-3 px-4 text-lg hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleMobileDropdown(item.label)}
          >
            {item.label}
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64' : 'max-h-0'}`}>
            {item.items.map((dropdownItem) => (
              <Link
                key={dropdownItem.href}
                href={dropdownItem.href}
                className="block py-2 px-8 text-base text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                onClick={toggleMenu}
              >
                {dropdownItem.label}
              </Link>
            ))}
          </div>
        </div>
      )
    }
  }

  return (
    <div className=" relative bg-red-500">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md z-30"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        {/* Logo */}
        <Link href="/" className="flex items-center z-20">
          <h1 className='text-xl md:text-2xl lg:text-3xl font-bold'>
            <span className="text-primary">Space</span>
            <span className="bg-primary text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-md ml-0.5">Tech</span>
          </h1>
        </Link>
        
        {/* Navigation Items - Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map(renderNavItem)}
        </div>
        
        {/* Phone Number (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-2 text-base group transition-colors duration-300 hover:text-red-500">
          <Phone className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform duration-300" />
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            (+92) 0123 456 789
          </span>
        </div>
        
        {/* Mobile Cart Button */}
        <Link
          href="/cart"
          className="lg:hidden flex items-center gap-2 text-base px-4 py-2 rounded-md relative z-20"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className='absolute -top-[8px] right-[10px] bg-secondary text-secondary-content px-1.5 py-0.5 rounded-full text-xs'>
            0
          </span>
        </Link>
      </div>
      
      {/* Mobile Menu - Sliding Panel */}
      <div className={`fixed top-0 left-0 h-full w-full  transition-all duration-300 ease-in-out z-50 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        {/* Overlay */}
        <div 
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-50' : 'opacity-0'}`} 
          onClick={toggleMenu}
        />
        
        {/* Sliding Menu Panel */}
        <div 
          className={`absolute top-0 left-0 h-full w-64 md:w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-4 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="py-6 px-4 bg-gray-50">
            <h1 className='text-xl font-bold'>
              <span className="text-primary">Space</span>
              <span className="bg-primary text-white px-1.5 py-0.5 rounded-md ml-0.5">Tech</span>
            </h1>
          </div>
          
          <div className="py-2">
            {navItems.map(renderMobileNavItem)}
          </div>
          
          <div className="absolute bottom-0 left-0 w-full border-t border-gray-100 p-4">
            <div className="flex items-center gap-2 text-base">
              <Phone className="h-5 w-5 text-red-500" />
              <span>(+92) 0123 456 79</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarMenu