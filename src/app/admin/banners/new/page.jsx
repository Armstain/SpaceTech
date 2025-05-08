'use client'
import BannerForm from '@/components/admin/BannerForm';

export default function NewBanner() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Banner</h1>
        <p className="text-gray-600 mt-1">Create a new banner for your homepage</p>
      </div>
      
      <BannerForm />
    </div>
  );
}
