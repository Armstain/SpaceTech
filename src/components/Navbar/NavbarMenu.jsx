'use client'
import React from 'react'
import Link from 'next/link'
import { Phone } from 'lucide-react'
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

  return (
    <div className="border-b">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <h1 className='text-2xl font-bold'>
            <span className="text-primary">Space</span>
            <span className="bg-primary text-white px-2 py-1 rounded-md ml-0.5">Tech</span>
          </h1>
        </Link>

        {/* Navigation Items */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map(renderNavItem)}
        </div>

        <div className="flex items-center gap-2 text-base group transition-colors duration-300 hover:text-red-500">
          <Phone className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform duration-300" />
          <span className="group-hover:translate-x-1 transition-transform duration-300">
            (+92) 0123 456 789
          </span>
        </div>
      </div>
    </div>
  )
}

export default NavbarMenu