'use client'
import React from 'react'
import { Search, ShoppingCart, Gift, CheckCircle, Menu } from 'lucide-react'
import Link from 'next/link'

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

const NavbarMain = () => {
  return (
    <div className='bg-primary text-primary-content'>
      <div className="container mx-auto">
        <div className="flex items-center h-14 px-4">
          {/* Left - Categories Button */}
          <button className="bg-secondary text-white h-full px-6 flex items-center gap-2 hidden lg:block">
            <span className="font-medium">TOP CATEGORIES</span>
            <Menu className="w-4 h-4" />
          </button>

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
            className="bg-secondary text-secondary-content h-full px-6 flex items-center gap-2 ml-auto hidden lg:block"
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
