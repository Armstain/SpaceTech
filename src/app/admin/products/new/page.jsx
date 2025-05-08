'use client'
import ProductForm from '@/components/admin/ProductForm';

export default function NewProduct() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p className="text-gray-600 mt-1">Create a new product in your inventory</p>
      </div>
      
      <ProductForm />
    </div>
  );
}
