"use client"
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaCcVisa, FaCcPaypal, FaCcMastercard, FaCcAmex } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 pt-16 pb-4 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="text-secondary mt-1" size={20} />
                <p>Dhaka, Bangladesh<br />1215</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-secondary" size={18} />
                <p>09639 420420</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-secondary" size={20} />
                <p>sales@spacetechbd.com</p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-secondary">About us</Link></li>
              <li><Link href="/delivery" className="hover:text-secondary">Delivery information</Link></li>
              <li><Link href="/privacy" className="hover:text-secondary">Privacy policy</Link></li>
              <li><Link href="/terms" className="hover:text-secondary">Terms & condition</Link></li>
              <li><Link href="/brands" className="hover:text-secondary">Brands</Link></li>
            </ul>
          </div>

          {/* My Account */}
          <div>
            <h3 className="text-xl font-bold mb-4">My account</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="hover:text-secondary">Login & register</Link></li>
              <li><Link href="/orders" className="hover:text-secondary">Order history</Link></li>
              <li><Link href="/wishlist" className="hover:text-secondary">Wishlist</Link></li>
              <li><Link href="/newsletter" className="hover:text-secondary">Newsletter</Link></li>
              <li><Link href="/specials" className="hover:text-secondary">Specials</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xl font-bold mb-4">Customer care</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="hover:text-secondary">Contact us</Link></li>
              <li><Link href="/returns" className="hover:text-secondary">Return policy</Link></li>
              <li><Link href="/sitemap" className="hover:text-secondary">Sitemap</Link></li>
              <li><Link href="/gift-certificates" className="hover:text-secondary">Gift certificates</Link></li>
              <li><Link href="/affiliate" className="hover:text-secondary">Affiliate</Link></li>
            </ul>
          </div>

          {/* Electon Legal */}
          <div>
            <h3 className="text-xl font-bold mb-4">Electon legal</h3>
            <ul className="space-y-2">
              <li><Link href="/return-policy" className="hover:text-secondary">Return policy</Link></li>
              <li><Link href="/payment-policy" className="hover:text-secondary">Payment policy</Link></li>
              <li><Link href="/advertising" className="hover:text-secondary">Adversting</Link></li>
              <li><Link href="/contact-store" className="hover:text-secondary">Contact store</Link></li>
              <li><Link href="/support" className="hover:text-secondary">Help & support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© 2025, Ecommerce By SpaceTech</p>
            
            <div className="flex items-center gap-4">
              <FaCcVisa size={32} className="text-[#1434CB]" />
              <FaCcPaypal size={32} className="text-[#253B80]" />
              <FaCcMastercard size={32} className="text-[#EB001B]" />
              <FaCcAmex size={32} className="text-[#006FCF]" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
