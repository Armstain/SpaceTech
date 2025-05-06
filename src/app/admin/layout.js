'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Tag, LayoutDashboard, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/" className="text-xl font-bold text-blue-600">
                  SpaceTech Admin
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                <LogOut className="w-5 h-5 inline mr-1" />
                Exit Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-4">
            <ul>
              <li className="mb-2">
                <Link 
                  href="/admin/dashboard" 
                  className={`flex items-center px-4 py-3 rounded-md ${
                    isActive('/admin/dashboard') 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <LayoutDashboard className="mr-3 h-5 w-5" />
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  href="/admin/products" 
                  className={`flex items-center px-4 py-3 rounded-md ${
                    isActive('/admin/products') 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <ShoppingBag className="mr-3 h-5 w-5" />
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link 
                  href="/admin/categories" 
                  className={`flex items-center px-4 py-3 rounded-md ${
                    isActive('/admin/categories') 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Tag className="mr-3 h-5 w-5" />
                  Categories
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
} 