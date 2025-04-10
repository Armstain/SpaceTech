'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, Heart } from 'lucide-react'

const NavbarOffer = () => {
  return (
    <div className='bg-base-200'>
      <div className='container mx-auto'>
        <div className="py-2 text-sm">
          <div className="container mx-auto flex justify-between items-center px-4">
            <div className="text-gray-600 hidden md:block">
              Need help? call us : 09639 420420
            </div>
            
            <div className="flex items-center gap-2 text-center">
               <p className=" ">🚧 This site is under construction - Coming Soon! 🚧</p>
              {/* <Link 
                href="/list" 
                className="text-red-500 font-semibold hover:text-red-600"
              >
                SHOP NOW!
              </Link> */}
            </div>

            <div className=" items-center gap-4 hidden md:flex">
              <Link href="/auth" className="hover:text-gray-600 flex items-center gap-1">
                <User size={20} />
                Sign in
              </Link>
              <Link href="/wishlist" className="hover:text-gray-600 flex items-center gap-1">
                <Heart size={20} />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarOffer
