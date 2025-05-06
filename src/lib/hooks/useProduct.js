'use client';

import { useState, useEffect } from 'react';
import { normalizeProduct } from '@/lib/utils/product-helpers';

/**
 * Custom hook to fetch a single product by id
 * @param {string} id - Product id
 * @returns {Object} - Product data and loading state
 */
export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchProduct() {
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch product');
        }
        
        // Transform product data for frontend use using the normalizer
        const formattedProduct = normalizeProduct(data.product);
        
        setProduct(formattedProduct);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(err.message);
        setIsLoading(false);
      }
    }
    
    fetchProduct();
  }, [id]);
  
  return { product, isLoading, error };
} 