'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Save, X, Upload, Clock } from 'lucide-react';
import Image from 'next/image';

export default function BannerForm({ banner, isEditing = false }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [serverError, setServerError] = useState('');
  const [categories, setCategories] = useState([]);
  
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
      title: '',
      description: '',
      originalPrice: '',
      salePrice: '',
      discount: 0,
      imageFile: null,
      imageUrl: '',
      imagePublicId: '',
      imageAlt: '',
      expiryHours: 24,
      isActive: true,
      order: 0,
      category: ''
    }
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEditing && banner) {
      // Populate form with banner data using React Hook Form's setValue
      const fields = [
        'title', 'description', 'originalPrice', 'salePrice', 'discount',
        'imageAlt', 'expiryHours', 'isActive', 'order', 'category'
      ];
      
      fields.forEach(field => {
        setValue(field, banner[field] !== undefined ? banner[field] : 
          field === 'expiryHours' ? 24 : 
          field === 'isActive' ? true : 
          field === 'discount' ? 0 : 
          field === 'order' ? 0 : '');
      });
      
      // Set image data if available
      if (banner.image && banner.image.url) {
        setValue('imageUrl', banner.image.url);
        setValue('imagePublicId', banner.image.publicId);
        setPreviewImage(banner.image.url);
      }
    }
  }, [isEditing, banner, setValue]);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create a local URL for preview
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
    
    // Store the file for later upload
    setValue('imageFile', file);
    
    // Set image alt text to file name if it's empty
    const currentAlt = getValues('imageAlt');
    if (!currentAlt) {
      setValue('imageAlt', file.name);
    }
  };



  const onSubmit = async (data) => {
    // Validate image
    if (!data.imageFile && !data.imageUrl) {
      setServerError('Please upload an image for the banner');
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
        formData.append('folder', 'banners');
        
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
      
      // Prepare the banner data
      const bannerData = {
        title: data.title,
        description: data.description,
        originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
        salePrice: Number(data.salePrice),
        discount: Number(data.discount),
        image: imageData,
        imageAlt: data.imageAlt,
        expiryHours: Number(data.expiryHours),
        isActive: data.isActive,
        order: Number(data.order),
        category: data.category || undefined
      };
      
      // Send to API
      const url = isEditing 
        ? `/api/banners/${banner._id}` 
        : '/api/banners';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bannerData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save banner');
      }
      
      // Redirect to banners list
      router.push('/admin/banners');
      router.refresh();
    } catch (error) {
      console.error('Error saving banner:', error);
      setServerError('Failed to save banner. Please try again.');
      
      // Scroll to the error message
      const errorElement = document.querySelector('.server-error');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate discount automatically when originalPrice or salePrice changes
  const originalPrice = watch('originalPrice');
  const salePrice = watch('salePrice');
  
  useEffect(() => {
    if (originalPrice && salePrice) {
      const origPrice = Number(originalPrice);
      const salesPrice = Number(salePrice);
      
      if (origPrice > 0 && salesPrice > 0 && origPrice > salesPrice) {
        const discount = Math.round(((origPrice - salesPrice) / origPrice) * 100);
        setValue('discount', discount);
      }
    }
  }, [originalPrice, salePrice, setValue]);

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
            <h2 className="text-xl font-bold mb-4">Banner Information</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Title*
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter banner title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.title.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description')}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter banner description"
                ></textarea>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Banner Image</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image*
                </label>
                <div className={`border-2 border-dashed rounded-lg p-4 text-center ${
                  errors.imageFile ? 'border-red-300' : 'border-gray-300'
                }`}>
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
                      Click to upload banner image
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
                  <div className="relative h-64 w-full rounded-md overflow-hidden border border-gray-200">
                    {typeof previewImage === 'string' && previewImage.length > 0 ? (
                      <Image
                        src={previewImage}
                        alt="Banner preview"
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
              
              <div>
                <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700 mb-1">
                  Image Alt Text*
                </label>
                <input
                  type="text"
                  id="imageAlt"
                  {...register('imageAlt', { required: 'Image alt text is required for accessibility' })}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.imageAlt ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe the image for accessibility"
                />
                {errors.imageAlt && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.imageAlt.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Provide a description of the image for screen readers and accessibility
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar - right side */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Pricing</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    id="originalPrice"
                    {...register('originalPrice', {
                      min: { value: 0, message: 'Original price must be a positive number' },
                      validate: value => !value || !isNaN(value) || 'Please enter a valid number'
                    })}
                    className={`w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.originalPrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.originalPrice && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.originalPrice.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="salePrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Sale Price*
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    id="salePrice"
                    {...register('salePrice', {
                      required: 'Sale price is required',
                      min: { value: 0.01, message: 'Sale price must be greater than 0' },
                      validate: value => !isNaN(value) || 'Please enter a valid number'
                    })}
                    className={`w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                      errors.salePrice ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="0.00"
                  />
                </div>
                {errors.salePrice && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.salePrice.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                  Discount Percentage
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    id="discount"
                    {...register('discount', {
                      min: { value: 0, message: 'Discount cannot be negative' },
                      max: { value: 100, message: 'Discount cannot exceed 100%' },
                      valueAsNumber: true
                    })}
                    className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="0"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                    %
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Auto-calculated based on original and sale price
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="expiryHours" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Hours
                </label>
                <div className="flex items-center">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      min="1"
                      id="expiryHours"
                      {...register('expiryHours', {
                        min: { value: 1, message: 'Expiry hours must be at least 1' },
                        valueAsNumber: true
                      })}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Countdown timer duration in hours
                </p>
              </div>
              
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  min="0"
                  id="order"
                  {...register('order', {
                    min: { value: 0, message: 'Order cannot be negative' },
                    valueAsNumber: true
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Lower numbers appear first
                </p>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Optional - associate this banner with a category
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
                    {isEditing ? 'Update Banner' : 'Create Banner'}
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
