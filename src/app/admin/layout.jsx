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
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Gift,
  ShoppingCart,
  Heart,
  HelpCircle,
  Phone,
  Laptop,
  Smartphone,
  Watch,
  Headphones,
  Camera
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  // const { isAdmin, loading, session } = useAdminProtected(); // AUTH PROTECTION DISABLED FOR DEVELOPMENT
  const session = null; // No session required for now
  const isAdmin = true;
  const loading = false;
  const router = useRouter();
  
  // Set sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  // Admin menu items
  const adminMenuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: ShoppingBag },
    { name: 'Categories', href: '/admin/categories', icon: Tag },
    { name: 'Banners', href: '/admin/banners', icon: ImageIcon },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  // Store navigation items
  const storeNavItems = [
    { name: 'Homepage', href: '/', icon: Home },
    { name: 'My Cart', href: '/cart', icon: ShoppingCart },
    { name: 'Wishlist', href: '/wishlist', icon: Heart },
    { name: 'Gift Vouchers', href: '/gift-vouchers', icon: Gift },
    { name: 'Help Center', href: '/help', icon: HelpCircle },
    { name: 'Contact Us', href: '/contact', icon: Phone },
  ];
  
  // // Product categories
  // const categoryItems = [
  //   { name: 'Laptops & Computers', href: '/category/laptops', icon: Laptop },
  //   { name: 'Smartphones & Tablets', href: '/category/smartphones', icon: Smartphone },
  //   { name: 'Smartwatches', href: '/category/smartwatches', icon: Watch },
  //   { name: 'Audio & Headphones', href: '/category/audio', icon: Headphones },
  //   { name: 'Cameras', href: '/category/cameras', icon: Camera },
  // ];

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
    <div className="min-h-screen bg-gray-100 relative">
      {/* Admin Navbar - always on top */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-30">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/admin" className="text-xl font-bold text-primary ml-2">
              SpaceTech Admin
            </Link>
          </div>
          
          {session?.user ? (
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium hidden sm:block">{session?.user?.name || 'User'}</p>
              <button
                onClick={handleLogout}
                className="p-2 text-red-600 rounded-md hover:bg-red-50"
                aria-label="Sign out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              href="/"
              className="p-2 text-gray-700 rounded-md hover:bg-gray-100"
              aria-label="Back to site"
            >
              <LogOut size={20} />
            </Link>
          )}
        </div>
      </header>
      
      {/* Admin Sidebar */}
      <aside 
        className={`
          fixed left-0 top-16 bottom-0 z-20
          w-64 ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}
          bg-white shadow-lg
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}
      >
        {/* Collapse toggle button - only visible on desktop */}
        <button 
          onClick={toggleCollapse}
          className="absolute top-4 right-2 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200
            transition-all duration-300 hidden lg:flex items-center justify-center"
          aria-label="Collapse sidebar"
        >
          {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
        
        <div className={`mt-6 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
          <nav className="space-y-6">
            {/* Admin Navigation */}
            <div>
              <h3 className={`text-xs uppercase text-gray-500 font-semibold mb-2 ${sidebarCollapsed ? 'text-center' : 'px-3'}`}>
                {!sidebarCollapsed && 'Admin'}
              </h3>
              <ul className="space-y-1">
                {adminMenuItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`
                        flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100
                        ${sidebarCollapsed ? 'justify-center' : ''}
                      `}
                      title={sidebarCollapsed ? item.name : ''}
                    >
                      <item.icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                      {!sidebarCollapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Store Navigation */}
            <div>
              <h3 className={`text-xs uppercase text-gray-500 font-semibold mb-2 ${sidebarCollapsed ? 'text-center' : 'px-3'}`}>
                {!sidebarCollapsed && 'Store Navigation'}
              </h3>
              <ul className="space-y-1">
                {storeNavItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`
                        flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100
                        ${sidebarCollapsed ? 'justify-center' : ''}
                      `}
                      title={sidebarCollapsed ? item.name : ''}
                    >
                      <item.icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                      {!sidebarCollapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Categories */}
            {/* <div>
              <h3 className={`text-xs uppercase text-gray-500 font-semibold mb-2 ${sidebarCollapsed ? 'text-center' : 'px-3'}`}>
                {!sidebarCollapsed && 'Product Categories'}
              </h3>
              <ul className="space-y-1">
                {categoryItems.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href}
                      className={`
                        flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100
                        ${sidebarCollapsed ? 'justify-center' : ''}
                      `}
                      title={sidebarCollapsed ? item.name : ''}
                    >
                      <item.icon className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                      {!sidebarCollapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
          </nav>
        </div>
        
        <div className={`
          absolute bottom-6 w-full border-t pt-4 space-y-2
          ${sidebarCollapsed ? 'px-2' : 'px-4'}
        `}>
          <Link 
            href="/"
            className={`
              flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed ? 'Back to Site' : ''}
          >
            <LogOut className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && <span>Back to Site</span>}
          </Link>
          
          <button
            onClick={handleLogout}
            className={`
              flex w-full items-center p-3 text-red-600 rounded-md hover:bg-red-50
              ${sidebarCollapsed ? 'justify-center' : ''}
            `}
            title={sidebarCollapsed ? 'Sign Out' : ''}
          >
            <LogOut className={`w-5 h-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
          
          {session?.user && !sidebarCollapsed && (
            <div className="flex items-center p-3 border-t pt-4">
              <div className="flex-1">
                <p className="font-medium">{session?.user?.name || 'User'}</p>
                <p className="text-xs text-gray-500">{session?.user?.email || ''}</p>
              </div>
            </div>
          )}
        </div>
      </aside>
      
      {/* Main content area */}
      <main 
        className={`
          pt-16 min-h-screen transition-all duration-300 ease-in-out
          ${sidebarOpen && !sidebarCollapsed ? 'lg:ml-64' : ''}
          ${sidebarOpen && sidebarCollapsed ? 'lg:ml-20' : ''}
          relative z-10
        `}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        />
      )}
    </div>
  );
}
