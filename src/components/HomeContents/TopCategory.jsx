'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';

const TopCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch top categories from MongoDB
  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/top-categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch top categories');
        }
        
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          setCategories(data.data);
        } else {
          // If no categories found, we'll show the UI with empty state
          setCategories([]);
        }
      } catch (error) {
        console.error('Error fetching top categories:', error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTopCategories();
  }, []);
  
  // Find the main category (if any)
  const mainCategory = categories.find(cat => cat.isMainCategory);
  // Get the regular categories (non-main)
  const regularCategories = categories.filter(cat => !cat.isMainCategory);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Top category</h2>
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No categories found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {/* Main Product - Takes 3 columns */}
          {mainCategory && (
            <div className={`md:col-span-3 row-span-2 ${mainCategory.backgroundColor || 'bg-base-300'} rounded-2xl p-6`}>
              <div className="text-sm text-neutral">Featured Category</div>
              <h3 className="text-2xl font-bold mt-2">{mainCategory.name}</h3>
              <div className="text-3xl font-bold text-secondary mt-2">${mainCategory.price.toFixed(2)}</div>
              <div className="mt-4 w-full h-64 relative">
                {mainCategory && mainCategory.image && mainCategory.image.url && typeof mainCategory.image.url === 'string' && mainCategory.image.url.length > 0 ? (
                  <Image 
                    src={mainCategory.image.url} 
                    alt={mainCategory.name || 'Category image'} 
                    className="object-contain"
                    fill
                  />
                ) : mainCategory && mainCategory.imageSrc && typeof mainCategory.imageSrc === 'string' && mainCategory.imageSrc.length > 0 ? (
                  <Image 
                    src={mainCategory.imageSrc} 
                    alt={mainCategory.name || 'Category image'} 
                    className="object-contain"
                    fill
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gray-100">
                    <p className="text-gray-500">No image available</p>
                  </div>
                )}
              </div>
              <button className="bg-secondary p-3 rounded-lg mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          )}

          {/* Small Product Cards */}
          {regularCategories.map((category, index) => (
            <div 
              key={category._id} 
              className={`${category.backgroundColor || 'bg-gray-50'} rounded-2xl p-4 flex flex-col items-center ${index >= regularCategories.length - 2 ? 'md:col-span-' + (index === regularCategories.length - 1 ? '1' : '2') : ''}`}
            >
              <h3 className="font-semibold mb-4">{category.name}</h3>
              <div className="w-24 h-24 relative">
                {category && category.image && category.image.url && typeof category.image.url === 'string' && category.image.url.length > 0 ? (
                  <Image 
                    src={category.image.url} 
                    alt={category.name || 'Category image'} 
                    className="object-contain"
                    fill
                  />
                ) : category && category.imageSrc && typeof category.imageSrc === 'string' && category.imageSrc.length > 0 ? (
                  <Image 
                    src={category.imageSrc} 
                    alt={category.name || 'Category image'} 
                    className="object-contain"
                    fill
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-gray-100">
                    <p className="text-gray-500 text-xs">No image</p>
                  </div>
                )}
              </div>
              <div className="mt-4 font-semibold">${category.price.toFixed(2)}</div>
            </div>
          ))}
      </div>
      )}
    </div>
  );
};

export default TopCategory;
