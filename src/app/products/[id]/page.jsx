'use client';

import { ProductActions } from '@/components/product/ProductActions';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductTabs } from '@/components/product/ProductTabs';
import Link from 'next/link';
import useProduct from '@/lib/hooks/useProduct';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProductPage() {
  const params = useParams();
  const { product, isLoading, error } = useProduct(params.id);
  const [metaSet, setMetaSet] = useState(false);
  
  // Set page metadata when product is loaded
  useEffect(() => {
    if (product && !metaSet) {
      document.title = `${product.name} - Your Store`;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = `Buy ${product.name} - Features high-resolution display and long battery life.`;
      
      setMetaSet(true);
    }
  }, [product, metaSet]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500 min-h-[60vh] flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Product</h2>
          <p>{error}</p>
          <Link href="/" className="mt-6 text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center min-h-[60vh] flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p>Sorry, we couldn't find the product you're looking for.</p>
          <Link href="/" className="mt-6 text-primary hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-primary">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery product={product} />
        
        <div>
          {/* Product details */}
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="text-primary text-2xl font-bold">
              ${product.currentPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-gray-500 line-through text-xl">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-primary text-white text-sm px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-6">
            {product.description || 
              `The ${product.name} features a high-resolution display that's visible even in bright sunlight.
              With the latest hardware, it delivers smooth performance for all your daily tasks.
              Its battery life ensures you can go days without needing to charge.`
            }
          </p>

          {/* Interactive elements */}
          <ProductActions
            product={product}
          />

          {/* Static elements */}
          <div className="mb-6">
            <span className="font-semibold">Sku:</span> {product.sku || 'N/A'}
          </div>
          
          {/* Payment methods */}
          <div className="flex gap-2">
            <img src="/images/visa.png" alt="Visa" className="h-8 w-auto" />
            <img src="/images/paypal.png" alt="PayPal" className="h-8 w-auto" />
            <img src="/images/mastercard.png" alt="Mastercard" className="h-8 w-auto" />
            <img src="/images/amex.png" alt="American Express" className="h-8 w-auto" />
          </div>
        </div>
      </div>
      
      {/* Tabs section */}
      <ProductTabs product={product} />
    </div>
  );
} 