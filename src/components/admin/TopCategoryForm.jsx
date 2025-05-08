'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Save, Upload, Tag } from 'lucide-react';
import Image from 'next/image';

export default function TopCategoryForm({ topCategory, isEditing = false }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [serverError, setServerError] = useState('');
  
  // Initialize React Hook Form
  const { 
    control, 
    register, 
    handleSubmit: hookFormSubmit, 
    formState: { errors }, 
    setValue, 
    watch,
    getValues 
  } = useForm({
    defaultValues: {
      name: '',
      price: '',
      imageFile: null,
      imageUrl: '',
      imagePublicId: '',
      backgroundColor: 'bg-base-300',
      isMainCategory: false,
      order: 0,
      isActive: true
    }
  });

  // Background color options
  const bgColorOptions = [
    { value: 'bg-base-300', label: 'Default (Gray)' },
    { value: 'bg-pink-50', label: 'Pink' },
    { value: 'bg-blue-50', label: 'Blue' },
    { value: 'bg-green-50', label: 'Green' },
    { value: 'bg-yellow-50', label: 'Yellow' },
    { value: 'bg-purple-50', label: 'Purple' },
    { value: 'bg-orange-50', label: 'Orange' },
    { value: 'bg-red-50', label: 'Red' },
    { value: 'bg-indigo-50', label: 'Indigo' },
  ];

  useEffect(() => {
    if (isEditing && topCategory) {
      // Populate form with topCategory data using React Hook Form's setValue
      const fields = [
        'name', 'price', 'backgroundColor', 'isMainCategory', 'order', 'isActive'
      ];
      
      fields.forEach(field => {
        setValue(field, topCategory[field] !== undefined ? topCategory[field] : 
          field === 'backgroundColor' ? 'bg-base-300' : 
          field === 'isActive' ? true : 
          field === 'order' ? 0 : '');
      });
      
      // Set image data if available
      if (topCategory.image && topCategory.image.url) {
        setValue('imageUrl', topCategory.image.url);
        setValue('imagePublicId', topCategory.image.publicId);
        setPreviewImage(topCategory.image.url);
      }
    }
  }, [isEditing, topCategory, setValue]);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create a local URL for preview
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    
    // Store the file for later upload
    setValue('imageFile', file);
  };



  const onSubmit = async (data) => {
    // Validate image
    if (!data.imageFile && !data.imageUrl) {
      setServerError('Please upload an image for the category');
      return;
    }
    
    setIsLoading(true);
    setServerError('');
    
    try {
      let imageData = {
        url: data.imageUrl,
        publicId: data.imagePublicId
      };
      
      // If there's a new image file, upload it to Cloudinary
      if (data.imageFile) {
        const formData = new FormData();
        formData.append('file', data.imageFile);
        formData.append('folder', 'categories');
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }
        
        const uploadResult = await uploadResponse.json();
        imageData = {
          url: uploadResult.url,
          publicId: uploadResult.publicId
        };
      }
      
      // Prepare the category data
      const categoryData = {
        name: data.name,
        price: Number(data.price),
        image: imageData,
        backgroundColor: data.backgroundColor,
        isMainCategory: data.isMainCategory,
        order: Number(data.order),
        isActive: data.isActive
      };
      
      // Send to API
      const url = isEditing 
        ? `/api/top-categories/${topCategory._id}` 
        : '/api/top-categories';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save top category');
      }
      
      // Redirect to categories list
      router.push('/admin/categories');
      router.refresh();
    } catch (error) {
      console.error('Error saving top category:', error);
      setServerError('Failed to save top category. Please try again.');
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content - left side */}
        <div className="md:col-span-2 space-y-6">
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
                  {...register('name', { required: 'Name is required' })}
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
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    id="price"
                    {...register('price', { 
                      required: 'Price is required',
                      min: { value: 0.01, message: 'Price must be greater than 0' },
                      validate: value => !isNaN(value) || 'Please enter a valid number'
                    })}
                    className={`w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.price.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Category Image</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image*
                </label>
                <div className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.imageFile ? 'border-red-300' : 'border-gray-300'}`}>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  <label 
                    htmlFor="image" 
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <span className="text-gray-600 font-medium">
                      Click to upload category image
                    </span>
                    <span className="text-gray-500 text-sm mt-1">
                      PNG, JPG, GIF up to 5MB
                    </span>
                  </label>
                </div>
                {errors.imageFile && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.imageFile.message}</p>
                )}
              </div>
              
              {previewImage ? (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-700 mb-2">Preview</h3>
                  <div className={`relative h-48 w-48 rounded-md overflow-hidden border border-gray-200 mx-auto ${watch('backgroundColor')}`}>
                    {typeof previewImage === 'string' && previewImage.length > 0 ? (
                      <Image
                        src={previewImage}
                        alt="Category preview"
                        fill
                        className="object-contain"
                        unoptimized={previewImage.startsWith('blob:')}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-gray-100">
                        <p className="text-gray-500">Image preview not available</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        
        {/* Sidebar - right side */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Appearance</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-1">
                  Background Color
                </label>
                <select
                  id="backgroundColor"
                  {...register('backgroundColor')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  {bgColorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center">
                <Controller
                  name="isMainCategory"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id="isMainCategory"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  )}
                />
                <label htmlFor="isMainCategory" className="ml-2 block text-sm text-gray-700">
                  Main Featured Category
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                If checked, this will be displayed as the main category in the top categories section.
                Only one category can be the main category.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  id="order"
                  {...register('order', {
                    valueAsNumber: true
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Lower numbers appear first
                </p>
              </div>
              
              <div className="flex items-center">
                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  )}
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2" size={18} />
                    {isEditing ? 'Update Category' : 'Create Category'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
