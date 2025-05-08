'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
// import { useAdminProtected } from '@/lib/auth'; // AUTH PROTECTION DISABLED FOR DEVELOPMENT
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Tag, 
  Image as ImageIcon, 
  Users, 
  Settings, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const { isAdmin, loading, session } = useAdminProtected(); // AUTH PROTECTION DISABLED FOR DEVELOPMENT
  const session = null; // No session required for now
  const isAdmin = true;
  const loading = false;
  const router = useRouter();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: Tag },
    { name: 'Banners', href: '/admin/banners', icon: ImageIcon },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  // AUTH PROTECTION DISABLED FOR DEVELOPMENT
  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  //     </div>
  //   );
  // }
  // 
  // if (!isAdmin) {
  //   return null; // The useAdminProtected hook will handle the redirect
  // }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 z-50 w-full bg-white shadow-md p-4 flex items-center justify-between">
        <Link href="/admin" className="text-xl font-bold text-primary">
          SpaceTech Admin
        </Link>
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 z-40 h-screen transition-transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        w-64 bg-white shadow-xl
      `}>
        <div className="p-5 border-b">
          <Link href="/admin" className="text-xl font-bold text-primary">
            SpaceTech Admin
          </Link>
        </div>
        
        <nav className="mt-5 px-2">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link 
                  href={item.href}
                  className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="absolute bottom-0 w-full p-5 border-t space-y-2">
          <Link 
            href="/"
            className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Back to Site
          </Link>
          
          <button
            onClick={handleLogout}
            className="flex w-full items-center p-3 text-red-600 rounded-md hover:bg-red-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
          
          {session?.user && (
            <div className="flex items-center p-3 border-t pt-4">
              <div className="flex-1">
                <p className="font-medium">{session?.user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{session?.user?.email || ''}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <main className="p-6">
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
