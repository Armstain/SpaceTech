'use client';

import Image from 'next/image';
import { useState } from 'react';
import placeholderImage from '@/public/assets/1.jpg';

/**
 * A component to handle product images with fallback
 */
export default function ProductImage({ 
  src, 
  alt, 
  width = 300, 
  height = 300,
  className = "",
  ...props 
}) {
  const [imageSrc, setImageSrc] = useState(src || placeholderImage);
  const [error, setError] = useState(false);
  
  // Handle image loading error
  const handleError = () => {
    if (!error) {
      setError(true);
      setImageSrc(placeholderImage);
    }
  };
  
  // Determine if the image is a local import or a URL
  const isImportedImage = typeof imageSrc === 'object' && imageSrc.src;
  const imageSource = isImportedImage ? imageSrc : imageSrc;
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={imageSource}
        alt={alt || "Product image"}
        width={width}
        height={height}
        onError={handleError}
        className={`w-full h-full object-cover ${props.className || ''}`}
        {...props}
      />
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 text-xs text-gray-500">
          Image not available
        </div>
      )}
    </div>
  );
} 