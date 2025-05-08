'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import CategoryForm from '@/components/admin/CategoryForm';

export default function EditCategory() {
  const params = useParams();
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }
        
        const data = await response.json();
        setCategory(data.category);
      } catch (error) {
        console.error('Error fetching category:', error);
        setError('Failed to load category. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCategory();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-6">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit Category</h1>
        <p className="text-gray-600 mt-1">Update category information</p>
      </div>
      
      {category && <CategoryForm category={category} isEditing={true} />}
    </div>
  );
} 