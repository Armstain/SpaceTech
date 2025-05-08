'use client'
import React, { useState, useRef } from 'react'
import { Search, ShoppingCart, Gift, CheckCircle, Menu, Laptop, Smartphone, Watch, Headphones, Camera, User, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Dropdown from '@/components/ui/Dropdown'
import { useCart } from '@/context/CartContext'

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
  const { items, itemCount, subtotal } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.role === 'admin';
  
  // Format subtotal to display as currency
  const formattedSubtotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(subtotal);
  
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };
  
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

          {/* Right - User Account & Cart */}
          <div className="flex items-center ml-auto">
            {/* User Account */}
            <Dropdown
              trigger={
                <button className="h-full px-4 py-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="hidden lg:inline">
                    {isAuthenticated && session?.user?.name ? session.user.name.split(' ')[0] : 'Account'}
                  </span>
                </button>
              }
            >
              <div className="p-4 w-64 text-base-content">
                {isAuthenticated ? (
                  <>
                    <div className="mb-4 pb-3 border-b">
                      <p className="font-medium text-lg">{session?.user?.name || 'User'}</p>
                      <p className="text-sm text-gray-500">{session?.user?.email || ''}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Link 
                        href="/profile" 
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md w-full transition-colors"
                      >
                        <User className="w-5 h-5" />
                        <span>My Profile</span>
                      </Link>
                      
                      {isAdmin && (
                        <Link 
                          href="/admin" 
                          className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md w-full transition-colors"
                        >
                          <Settings className="w-5 h-5" />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md w-full transition-colors text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Link 
                      href="/login" 
                      className="block w-full bg-primary text-white py-2 px-4 rounded text-center hover:bg-primary-dark transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/register" 
                      className="block w-full bg-secondary text-white py-2 px-4 rounded text-center hover:bg-secondary-dark transition-colors"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </Dropdown>
            
            {/* Cart */}
            <Dropdown
              trigger={
                <Link 
                  href="/cart" 
                  className="bg-secondary text-secondary-content h-full px-6 py-4 items-center gap-2 hidden md:flex"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <div className="flex items-center gap-1">
                    <span>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
                    {/* <span>{formattedSubtotal}</span> */}
                  </div>
                </Link>
              }
            >
              <div className="p-4 w-80 text-black">
                <h3 className="font-medium text-lg mb-3">Cart Preview</h3>
              
              {items.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <>
                  <div className="max-h-60 overflow-y-auto space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 border-b pb-3">
                        <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0">
                          {item.image && (
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × ${item.price?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-3 border-t flex justify-between font-medium">
                    <span>Subtotal:</span>
                    <span>{formattedSubtotal}</span>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link 
                      href="/cart" 
                      className="bg-secondary/80 hover:bg-secondary text-secondary-content py-2 px-4 rounded text-center transition-colors"
                    >
                      View Cart
                    </Link>
                    <Link 
                      href="/checkout" 
                      className="bg-primary/80 hover:bg-primary text-primary-content py-2 px-4 rounded text-center transition-colors"
                    >
                      Checkout
                    </Link>
                  </div>
                </>
              )}
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarMain
