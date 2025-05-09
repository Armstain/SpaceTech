'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { 
  Save, 
  X, 
  Upload, 
  Plus, 
  Minus, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

export default function ProductForm({ product, isEditing = false }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
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
      title: '',
      slug: '',
      description: '',
      price: '',
      originalPrice: '',
      discount: 0,
      category: '',
      status: 'draft',
      inventory: 0,
      isFeatured: false,
      images: [],
      image: ''
    }
  });

  useEffect(() => {
    fetchCategories();
    
    if (isEditing && product) {
      // Populate form with product data using React Hook Form's setValue
      const fields = [
        'title', 'slug', 'description', 'price', 'originalPrice', 'discount',
        'category', 'status', 'inventory', 'isFeatured'
      ];
      
      fields.forEach(field => {
        setValue(field, product[field] !== undefined ? product[field] : '');
      });
      
      // Set preview images if available
      if (product.images && product.images.length > 0) {
        setPreviewImages(product.images.map(img => ({
          url: img.url || img, // Handle both old format and new format with publicId
          publicId: img.publicId || '',
          file: null
        })));
      } else if (product.image) {
        setPreviewImages([{
          url: typeof product.image === 'string' ? product.image : product.image.url,
          publicId: typeof product.image === 'string' ? '' : (product.image.publicId || ''),
          file: null
        }]);
      }
    }
  }, [isEditing, product, setValue]);

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

  // Watch the title field to auto-generate slug
  const title = watch('title');
  const currentSlug = watch('slug');
  
  useEffect(() => {
    // Auto-generate slug from title if slug field is empty
    if (title && !currentSlug) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      setValue('slug', slug);
    }
  }, [title, currentSlug, setValue]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    
    handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    const newPreviewImages = imageFiles.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));
    
    setPreviewImages(prev => [...prev, ...newPreviewImages]);
  };

  const removeImage = async (index) => {
    const imageToRemove = previewImages[index];
    
    // Revoke object URL to prevent memory leaks if it's a local file
    if (imageToRemove.file) {
      URL.revokeObjectURL(imageToRemove.url);
    }
    
    // If this is a Cloudinary image with a publicId, delete it from Cloudinary
    if (imageToRemove.publicId && !imageToRemove.file) {
      try {
        await fetch('/api/upload/delete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ publicId: imageToRemove.publicId }),
        });
        console.log(`Deleted image with publicId: ${imageToRemove.publicId}`);
      } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
      }
    }
    
    // Remove the image from the preview list
    setPreviewImages(prev => {
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };



  const onSubmit = async (data) => {
    // Validate images
    if (previewImages.length === 0) {
      return;
    }
    
    setIsLoading(true);
    setServerError('');
    
    try {
      // First, upload images if there are new ones
      const uploadedImages = [];
      const newImages = previewImages.filter(img => img.file);
      
      if (newImages.length > 0) {
        // Upload each new image to Cloudinary
        for (const img of newImages) {
          const formData = new FormData();
          formData.append('file', img.file);
          formData.append('folder', 'products');
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error('Failed to upload image');
          }
          
          const result = await response.json();
          uploadedImages.push({
            url: result.url,
            publicId: result.publicId
          });
        }
      }
      
      // Combine existing image data with new ones
      const existingImages = previewImages
        .filter(img => !img.file)
        .map(img => ({
          url: img.url,
          publicId: img.publicId || ''
        }));
      
      const allImages = [...existingImages, ...uploadedImages];
      
      // Prepare the product data
      const productData = {
        ...data,
        price: Number(data.price),
        originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
        inventory: Number(data.inventory),
        images: allImages,
        // Use the first image as the main product image
        image: allImages.length > 0 ? allImages[0].url : ''
      };
      
      // Send to API
      const url = isEditing 
        ? `/api/products/${product._id}` 
        : '/api/products';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save product');
      }
      
      // Redirect to products list
      router.push('/admin/products');
      router.refresh();
    } catch (error) {
      console.error('Error saving product:', error);
      setServerError('Failed to save product. Please try again.');
      
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
          <AlertCircle className="mr-2 mt-0.5" size={16} />
          <span>{serverError}</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main content - left side */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Title*
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.title.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                  Slug* (for URL)
                </label>
                <input
                  type="text"
                  id="slug"
                  {...register('slug', { required: 'Slug is required' })}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.slug ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="enter-product-slug"
                />
                {errors.slug && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.slug.message}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  This will be used in the product URL: /products/your-slug
                </p>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description*
                </label>
                <textarea
                  id="description"
                  {...register('description', { required: 'Description is required' })}
                  rows={5}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter product description"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Images</h2>
            
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center ${
                isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
              } ${errors.images ? 'border-red-300' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <label 
                htmlFor="images" 
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-12 w-12 text-gray-400 mb-3" />
                <span className="text-gray-600 font-medium">
                  Drag & drop images here or click to browse
                </span>
                <span className="text-gray-500 text-sm mt-1">
                  PNG, JPG, GIF up to 5MB
                </span>
              </label>
            </div>
            
            {errors.images && (
              <p className="mt-2 text-sm text-red-600 error-message">{errors.images}</p>
            )}
            
            {previewImages.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-3">Preview</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previewImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-md overflow-hidden border border-gray-200">
                        <div className="relative h-full w-full">
                          {image && image.url && typeof image.url === 'string' && image.url.length > 0 ? (
                            <Image
                              src={image.url}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover"
                              unoptimized={image.url.startsWith('blob:')}
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full w-full bg-gray-100">
                              <p className="text-gray-500 text-xs">No preview</p>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={16} className="text-gray-700" />
                      </button>
                      {index === 0 && (
                        <div className="absolute bottom-0 left-0 right-0 bg-primary text-white text-xs py-1 text-center">
                          Main Image
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  The first image will be used as the main product image.
                  Drag and drop to reorder.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Sidebar - right side */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Pricing</h2>
            
            <div className="space-y-4">
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
              
              <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (for discounts)
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
                <p className="mt-1 text-xs text-gray-500">
                  Leave empty if there is no discount
                </p>
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
                      max: { value: 100, message: 'Discount cannot exceed 100%' }
                    })}
                    className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="0"
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                    %
                  </span>
                </div>
                {errors.discount && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.discount.message}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Organization</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category*
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
                  Optional - associate this product with a category
                </p>
              </div>
              
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  {...register('status')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="inventory" className="block text-sm font-medium text-gray-700 mb-1">
                  Inventory
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => {
                      const currentValue = getValues('inventory');
                      setValue('inventory', Math.max(0, Number(currentValue) - 1));
                    }}
                    className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-50"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="0"
                    id="inventory"
                    {...register('inventory', {
                      min: { value: 0, message: 'Inventory cannot be negative' },
                      valueAsNumber: true
                    })}
                    className="w-full text-center py-2 border-y border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const currentValue = getValues('inventory');
                      setValue('inventory', Number(currentValue) + 1);
                    }}
                    className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                {errors.inventory && (
                  <p className="mt-1 text-sm text-red-600 error-message">{errors.inventory.message}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <Controller
                  name="isFeatured"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      id="isFeatured"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  )}
                />
                <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                  Feature this product on homepage
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
                    {isEditing ? 'Update Product' : 'Create Product'}
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
