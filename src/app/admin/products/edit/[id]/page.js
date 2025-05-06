'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ArrowLeft } from 'lucide-react';

export default function EditProduct({ params }) {
  const productId = params.id;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    images: [],
    status: 'draft'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageURLs, setImageURLs] = useState(['']);
  const [error, setError] = useState(null);

  // Fetch product data
  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch product');
        }
        
        // Set form data from product
        setFormData(data.product);
        
        // Set image URLs
        if (data.product.images && data.product.images.length > 0) {
          setImageURLs(data.product.images);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [productId]);

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        const data = await response.json();
        
        if (response.ok) {
          setCategories(data.categories || []);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    }
    
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || '' : value
    });
  };

  const handleImageURLChange = (index, value) => {
    const newURLs = [...imageURLs];
    newURLs[index] = value;
    
    // If editing the last empty field, add a new empty field
    if (index === newURLs.length - 1 && value.trim() !== '') {
      newURLs.push('');
    }
    
    setImageURLs(newURLs);
    
    // Update form data with non-empty URLs
    setFormData({
      ...formData,
      images: newURLs.filter(url => url.trim() !== '')
    });
  };

  const removeImageURL = (index) => {
    const newURLs = [...imageURLs];
    newURLs.splice(index, 1);
    
    // Always ensure at least one input field
    if (newURLs.length === 0) {
      newURLs.push('');
    }
    
    setImageURLs(newURLs);
    
    // Update form data
    setFormData({
      ...formData,
      images: newURLs.filter(url => url.trim() !== '')
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update product');
      }
      
      router.push('/admin/products');
    } catch (err) {
      alert('Error updating product: ' + err.message);
      setSaving(false);
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
      <div className="flex items-center mb-6">
        <Link href="/admin/products" className="mr-4">
          <ArrowLeft className="text-gray-600 hover:text-gray-900" />
        </Link>
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={5}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images
            </label>
            {imageURLs.map((url, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleImageURLChange(index, e.target.value)}
                  placeholder="Image URL"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {index < imageURLs.length - 1 && (
                  <button
                    type="button"
                    onClick={() => removeImageURL(index)}
                    className="ml-2 px-3 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50"
          >
            <Save className="mr-2" size={16} />
            {saving ? 'Saving...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
} 