'use client'
import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Tag, 
  Image as ImageIcon, 
  Users, 
  TrendingUp, 
  DollarSign 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    banners: 0,
    users: 0,
    revenue: 0,
    orders: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch actual stats from your API
    // For now, we'll simulate loading and set some example stats
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Example stats
        setStats({
          products: 120,
          categories: 15,
          banners: 8,
          users: 350,
          revenue: 15799.99,
          orders: 243
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { name: 'Products', value: stats.products, icon: ShoppingBag, color: 'bg-blue-500', href: '/admin/products' },
    { name: 'Categories', value: stats.categories, icon: Tag, color: 'bg-green-500', href: '/admin/categories' },
    { name: 'Banners', value: stats.banners, icon: ImageIcon, color: 'bg-purple-500', href: '/admin/banners' },
    { name: 'Users', value: stats.users, icon: Users, color: 'bg-yellow-500', href: '/admin/users' },
    { name: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: DollarSign, color: 'bg-red-500', href: '/admin/orders' },
    { name: 'Orders', value: stats.orders, icon: TrendingUp, color: 'bg-indigo-500', href: '/admin/orders' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your SpaceTech admin dashboard</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-12 w-12 rounded-lg bg-gray-200 mb-4"></div>
              <div className="h-6 w-24 bg-gray-200 mb-2 rounded"></div>
              <div className="h-8 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => (
            <Link 
              href={stat.href} 
              key={stat.name}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-gray-600 text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {isLoading ? (
              [...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="ml-4 flex-1">
                    <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center py-8">
                No recent activity to display
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link 
              href="/admin/products/new" 
              className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg transition-colors"
            >
              <ShoppingBag className="w-6 h-6 text-blue-500 mb-2" />
              <p className="font-medium">Add Product</p>
            </Link>
            <Link 
              href="/admin/categories/new" 
              className="bg-green-50 hover:bg-green-100 p-4 rounded-lg transition-colors"
            >
              <Tag className="w-6 h-6 text-green-500 mb-2" />
              <p className="font-medium">Add Category</p>
            </Link>
            <Link 
              href="/admin/banners/new" 
              className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg transition-colors"
            >
              <ImageIcon className="w-6 h-6 text-purple-500 mb-2" />
              <p className="font-medium">Add Banner</p>
            </Link>
            <Link 
              href="/admin/users/new" 
              className="bg-yellow-50 hover:bg-yellow-100 p-4 rounded-lg transition-colors"
            >
              <Users className="w-6 h-6 text-yellow-500 mb-2" />
              <p className="font-medium">Add User</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
