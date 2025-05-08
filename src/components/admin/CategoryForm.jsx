'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Save } from 'lucide-react';

export default function CategoryForm({ category, isEditing = false }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [serverError, setServerError] = useState('');

  // Initialize React Hook Form
  const { 
    control, 
    register, 
    handleSubmit: hookFormSubmit, 
    formState: { errors }, 
    setValue,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      parent_id: '',
      is_active: true
    }
  });

  // Fetch parent categories on component mount
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        // Filter out the current category if in edit mode
        const filteredCategories = isEditing && category
          ? (data.categories || []).filter(cat => cat._id !== category._id) 
          : (data.categories || []);
          
        setParentCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching parent categories:', error);
      }
    };

    fetchParentCategories();
  }, [isEditing, category]);

  // Set form data when editing
  useEffect(() => {
    if (isEditing && category) {
      // Set form values using React Hook Form's setValue
      setValue('name', category.name || '');
      setValue('description', category.description || '');
      setValue('parent_id', category.parent_id || '');
      setValue('is_active', category.is_active !== undefined ? category.is_active : true);
    }
  }, [isEditing, category, setValue]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError('');
    
    try {
      // Prepare the category data
      const categoryData = {
        ...data,
        // Ensure boolean fields are properly typed
        is_active: !!data.is_active
      };
      
      // If parent_id is empty, set it to null
      if (!categoryData.parent_id) {
        categoryData.parent_id = null;
      }
      
      // Send to API
      const url = isEditing 
        ? `/api/categories/${category._id}` 
        : '/api/categories';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save category');
      }
      
      // Redirect to categories list
      router.push('/admin/categories');
      router.refresh();
    } catch (error) {
      console.error('Error saving category:', error);
      setServerError('Failed to save category. Please try again.');
      
      // Scroll to the error message
      const errorElement = document.querySelector('.server-error');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={hookFormSubmit(onSubmit)} className="space-y-8">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start server-error">
          <span>{serverError}</span>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Category Information</h2>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name*
            </label>
            <input
              type="text"
              id="name"
              {...register('name', { required: 'Category name is required' })}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 error-message">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              placeholder="Enter category description"
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700 mb-1">
              Parent Category
            </label>
            <select
              id="parent_id"
              {...register('parent_id')}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">None (Top-level Category)</option>
              {parentCategories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <Controller
              name="is_active"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="is_active"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              )}
            />
            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
              Active
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.push('/admin/categories')}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md flex items-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : (
            <Save className="mr-2" size={18} />
          )}
          {isEditing ? 'Update Category' : 'Save Category'}
        </button>
      </div>
    </form>
  );
} 