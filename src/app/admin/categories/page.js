'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch categories');
      }
      
      setCategories(data.categories || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete category');
      }
      
      // Refresh the categories list
      fetchCategories();
    } catch (err) {
      alert('Error deleting category: ' + err.message);
    }
  };

  const handleNewCategoryChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...newCategory,
          is_active: true
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create category');
      }
      
      // Reset form
      setNewCategory({ name: '', description: '' });
      
      // Refresh categories
      fetchCategories();
      
      setSubmitting(false);
    } catch (err) {
      alert('Error creating category: ' + err.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link 
          href="/admin/products" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          View Products
        </Link>
      </div>
      
      {/* Add New Category Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleNewCategoryChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={newCategory.description}
                onChange={handleNewCategoryChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50"
            >
              <Plus className="mr-2" size={16} />
              {submitting ? 'Adding...' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Categories List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4">{category.description || 'No description'}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      category.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {category.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button onClick={() => handleDelete(category._id)}>
                        <Trash2 size={18} className="text-red-500 hover:text-red-700 cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 