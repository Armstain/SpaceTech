'use client'
import React, { useState, useRef } from 'react'
import { Search, ShoppingCart, Gift, CheckCircle, Menu, Laptop, Smartphone, Watch, Headphones, Camera, Monitor, Cpu, Keyboard, Printer, Gamepad } from 'lucide-react'
import Link from 'next/link'
import Dropdown from '@/components/ui/Dropdown'

const features = [
  {
    icon: <Gift className="w-5 h-5" />,
    label: 'GIFT VOUCHER'
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    label: 'BEST QUALITY'
  }
]

// Expanded category data with subcategories
const categoryData = [
  { 
    icon: <Laptop className="w-5 h-5" />, 
    label: 'Laptops & Computers', 
    href: '/category/laptops',
    subcategories: [
      { label: 'Gaming Laptops', href: '/category/laptops/gaming' },
      { label: 'Ultrabooks', href: '/category/laptops/ultrabooks' },
      { label: 'Desktop PCs', href: '/category/desktop' },
      { label: 'Computer Parts', href: '/category/computer-parts' }
    ]
  },
  { 
    icon: <Smartphone className="w-5 h-5" />, 
    label: 'Smartphones & Tablets', 
    href: '/category/smartphones',
    subcategories: [
      { label: 'Android Phones', href: '/category/smartphones/android' },
      { label: 'iPhones', href: '/category/smartphones/iphone' },
      { label: 'iPads', href: '/category/tablets/ipad' },
      { label: 'Android Tablets', href: '/category/tablets/android' }
    ]
  },
  { 
    icon: <Watch className="w-5 h-5" />, 
    label: 'Smartwatches', 
    href: '/category/smartwatches',
    subcategories: [
      { label: 'Apple Watch', href: '/category/smartwatches/apple' },
      { label: 'Samsung Galaxy Watch', href: '/category/smartwatches/samsung' },
      { label: 'Fitness Trackers', href: '/category/smartwatches/fitness' }
    ]
  },
  { 
    icon: <Headphones className="w-5 h-5" />, 
    label: 'Audio & Headphones', 
    href: '/category/audio',
    subcategories: [
      { label: 'Wireless Earbuds', href: '/category/audio/wireless-earbuds' },
      { label: 'Over-ear Headphones', href: '/category/audio/over-ear' },
      { label: 'Speakers', href: '/category/audio/speakers' }
    ]
  },
  { 
    icon: <Camera className="w-5 h-5" />, 
    label: 'Cameras & Photography', 
    href: '/category/cameras',
    subcategories: [
      { label: 'DSLR Cameras', href: '/category/cameras/dslr' },
      { label: 'Mirrorless Cameras', href: '/category/cameras/mirrorless' },
      { label: 'Camera Lenses', href: '/category/cameras/lenses' }
    ]
  }
]

const NavbarMain = () => {
  return (
    <div className='bg-primary text-primary-content relative z-10'>
      <div className="container mx-auto">
        <div className="flex items-center h-14 px-4">
          {/* Left - Categories Button with Dropdown using the Dropdown component */}
          <Dropdown 
            trigger={
              <div className="bg-secondary text-white h-full px-6 py-4 flex items-center gap-2">
                <span className="font-medium">TOP CATEGORIES</span>
              </div>
            }
          >
            <div className="py-2 w-64">
              {categoryData.map((category, index) => (
                <Dropdown
                  key={index}
                  trigger={
                    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors w-full">
                      <span className="text-secondary">{category.icon}</span>
                      <span>{category.label}</span>
                    </div>
                  }
                >
                  <div className="py-2">
                    {category.subcategories.map((subcat, idx) => (
                      <Link
                        key={idx}
                        href={subcat.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                      >
                        {subcat.label}
                      </Link>
                    ))}
                  </div>
                </Dropdown>
              ))}
            </div>
          </Dropdown>

          {/* Middle - Features and Search */}
          <div className="flex-1 flex items-center justify-between px-8">
            <div className="flex items-center gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  {feature.icon}
                  <span className="text-sm font-medium">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl px-4 hidden lg:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find our product"
                  className="w-full h-10 pl-4 pr-10 bg-base-200 rounded-md border text-base-content border-gray-300 focus:outline-none focus:border-gray-400"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <Search className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Right - Cart */}
          <Link 
            href="/cart" 
            className="bg-secondary text-secondary-content h-full px-6 items-center gap-2 ml-auto hidden md:flex"
          >
            <ShoppingCart className="w-5 h-5" />
            <div className="flex items-center gap-1">
              <span>0 Item</span>
              <span>$0.00</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NavbarMain
