'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch a single product by slug
 * @param {string} slug - Product slug
 * @returns {Object} - Product data and loading state
 */
export default function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch product from our API
        const response = await fetch(`/api/products/${slug}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error(`Error fetching product: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]);
  
  return { product, isLoading, error };
} 