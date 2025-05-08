'use client'
import CategoryForm from '@/components/admin/CategoryForm';

export default function NewCategory() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Category</h1>
        <p className="text-gray-600 mt-1">Create a new product category</p>
      </div>
      
      <CategoryForm />
    </div>
  );
} 