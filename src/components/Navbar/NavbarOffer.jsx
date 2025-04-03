import Link from 'next/link'
import { User, Heart } from 'lucide-react'

const NavbarOffer = () => {
  return (
    <div className='container mx-auto'>
      <div className="bg-white py-2 text-sm border-b">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-gray-600">
          Need help? call us : +8801717171717
        </div>
        
        <div className="flex items-center gap-2">
          <span>Today&apos;s deal sale 50% off</span>
          <Link 
            href="/list" 
            className="text-red-500 font-semibold hover:text-red-600"
          >
            SHOP NOW!
          </Link>
        </div>

        <div className="flex items-center gap-4">
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
  )
}

export default NavbarOffer
