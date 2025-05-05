'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch products from the API
 * @param {Object} options - Query options
 * @returns {Object} - Products and loading state
 */
export default function useProducts(options = {}) {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { limit = 12, offset = 0 } = options;
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Build query string
        const queryParams = new URLSearchParams();
        if (limit) queryParams.append('limit', limit.toString());
        if (offset) queryParams.append('offset', offset.toString());
        
        // Fetch products from our API
        const response = await fetch(`/api/products?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        
        const data = await response.json();
        setProducts(data.products);
        setCount(data.count);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [limit, offset]);
  
  return { products, count, isLoading, error };
} 