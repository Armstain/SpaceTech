'use client'

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ProductImage from '@/components/ui/ProductImage';
import placeholderImage from '@/public/assets/1.jpg';

export function ProductGallery({ product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  console.log(product);
  
  // Create an array of images for the product
  // If product.image is not available, use placeholder
  const productImage = product.image || placeholderImage;
  const images = [productImage];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative">
        <div className="mb-6 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-[500px]">
        <ProductImage
          src={images[currentImageIndex]} 
          alt={product.name} 
          width={500}
          height={500}
          className="max-h-full object-contain"
        />
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-4 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, index) => (
            <button 
              key={index}
              className={`border-2 p-1 rounded ${currentImageIndex === index ? 'border-primary' : 'border-gray-200'}`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <ProductImage src={img} alt="" width={80} height={80} className="h-20 w-20 object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}