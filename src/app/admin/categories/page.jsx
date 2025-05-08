'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  ChevronDown,
  ChevronUp,
  Tag,
  Search
} from 'lucide-react';
import Image from 'next/image';

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'top'

  useEffect(() => {
    fetchCategories();
    fetchTopCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTopCategories = async () => {
    try {
      const response = await fetch('/api/top-categories');
      
      if (!response.ok) {
        throw new Error('Failed to fetch top categories');
      }
      
      const data = await response.json();
      setTopCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching top categories:', error);
    }
  };

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const endpoint = activeTab === 'top' 
        ? `/api/top-categories/${categoryToDelete._id}`
        : `/api/categories/${categoryToDelete._id}`;
        
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete category');
      }
      
      // Refresh categories
      if (activeTab === 'top') {
        fetchTopCategories();
      } else {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setCategoryToDelete(null);
    }
  };

  const toggleCategoryStatus = async (category) => {
    try {
      const isTopCategory = activeTab === 'top';
      const endpoint = isTopCategory
        ? `/api/top-categories/${category._id}`
        : `/api/categories/${category._id}`;
      
      const statusField = isTopCategory ? 'isActive' : 'is_active';
      const currentStatus = isTopCategory ? category.isActive : category.is_active;
      
      const payload = isTopCategory
        ? { isActive: !currentStatus }
        : { is_active: !currentStatus };
        
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update category status');
      }
      
      // Refresh categories
      if (isTopCategory) {
        fetchTopCategories();
      } else {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error updating category status:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCategories = activeTab === 'top'
    ? topCategories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-gray-600">Manage your product categories</p>
        </div>
        <div className="flex space-x-3">
          <Link 
            href="/admin/categories/new"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="mr-2" size={20} />
            Add Category
          </Link>
          <Link 
            href="/admin/top-categories/new"
            className="bg-secondary hover:bg-secondary-dark text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="mr-2" size={20} />
            Add Top Category
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs and search */}
        <div className="p-4 border-b flex flex-col md:flex-row justify-between gap-4">
          <div className="flex border rounded-md overflow-hidden">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 ${
                activeTab === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setActiveTab('top')}
              className={`px-4 py-2 ${
                activeTab === 'top' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Top Categories
            </button>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64 focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No categories found</p>
            <Link 
              href={activeTab === 'top' ? "/admin/top-categories/new" : "/admin/categories/new"}
              className="inline-flex items-center text-primary hover:text-primary-dark"
            >
              <PlusCircle className="mr-2" size={16} />
              Create your first {activeTab === 'top' ? 'top ' : ''}category
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {activeTab === 'top' && (
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Image</th>
                  )}
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
                  {activeTab === 'all' && (
                    <th className="px-4 py-3 text-left font-medium text-gray-600">Parent</th>
                  )}
                  {activeTab === 'top' && (
                    <>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Price</th>
                      <th className="px-4 py-3 text-left font-medium text-gray-600">Featured</th>
                    </>
                  )}
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCategories.map(category => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    {activeTab === 'top' && (
                      <td className="px-4 py-3">
                        <div className="h-12 w-12 relative rounded-md overflow-hidden">
                          {category.imageSrc ? (
                            <Image
                              src={category.imageSrc}
                              alt={category.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                              <Tag size={16} />
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <span className="font-medium">{category.name}</span>
                      {category.description && (
                        <p className="text-sm text-gray-500 truncate max-w-xs">{category.description}</p>
                      )}
                    </td>
                    {activeTab === 'all' && (
                      <td className="px-4 py-3">
                        {category.parent_id ? (
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                            {categories.find(c => c._id === category.parent_id)?.name || 'Unknown'}
                          </span>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                    )}
                    {activeTab === 'top' && (
                      <>
                        <td className="px-4 py-3">
                          ${category.price?.toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          {category.isMainCategory ? (
                            <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                              Main Category
                            </span>
                          ) : (
                            <span className="text-gray-500">-</span>
                          )}
                        </td>
                      </>
                    )}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleCategoryStatus(category)}
                        className={`px-2 py-1 rounded-full text-xs ${
                          (activeTab === 'top' ? category.isActive : category.is_active)
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {(activeTab === 'top' ? category.isActive : category.is_active) ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={activeTab === 'top' 
                            ? `/admin/top-categories/${category._id}/edit`
                            : `/admin/categories/${category._id}/edit`
                          }
                          className="p-1 text-blue-500 hover:text-blue-700 rounded-md hover:bg-blue-50"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDeleteClick(category)}
                          className="p-1 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete "{categoryToDelete?.name}"?
              <br />
              <span className="text-red-500 text-sm">This action cannot be undone.</span>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCategoryToDelete(null);
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
