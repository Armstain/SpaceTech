'use client'
import TopCategoryForm from '@/components/admin/TopCategoryForm';

export default function NewTopCategory() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Top Category</h1>
        <p className="text-gray-600 mt-1">Create a new featured category for your homepage</p>
      </div>
      
      <TopCategoryForm />
    </div>
  );
}
