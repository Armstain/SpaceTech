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

const categoryData = [
  { 
    icon: <Laptop className="w-5 h-5" />, 
    label: 'Laptops & Computers', 
    href: '/category/laptops',
   
  },
  { 
    icon: <Smartphone className="w-5 h-5" />, 
    label: 'Smartphones & Tablets', 
    href: '/category/smartphones',
    
  },
  { 
    icon: <Watch className="w-5 h-5" />, 
    label: 'Smartwatches', 
    href: '/category/smartwatches',
    
  },
  { 
    icon: <Headphones className="w-5 h-5" />, 
    label: 'Audio & Headphones', 
    href: '/category/audio',
   
  },
  { 
    icon: <Camera className="w-5 h-5" />, 
    label: 'Cameras & Photography', 
    href: '/category/cameras',
    
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
                <Link
                  key={index}
                  href={category.href}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 transition-colors w-full text-base-content"
                >
                  <span className="text-base-content">{category.icon}</span>
                  <span>{category.label}</span>
                </Link>
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
                  className="w-full h-10 pl-4 pr-10 bg-base-200 rounded-md border-2 text-base-content border-gray-300 focus:outline-none focus:border-gray-400"
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
