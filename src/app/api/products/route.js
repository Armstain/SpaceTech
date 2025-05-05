import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/medusa/utils';
import { transformProduct } from '@/lib/medusa/utils';
import { medusaClient } from '@/lib/medusa/config';

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '12');
    const offset = parseInt(searchParams.get('offset') || '0');
    
    console.log("Fetching products from Medusa...");
    
    // 1. Try to fetch products directly using the client (which now has the publishable key)
    try {
      const response = await medusaClient.products.list({
        limit,
        offset
      });
      
      console.log("Products from medusaClient:", response.products ? `Found ${response.products.length} products` : "No products found");
      
      if (response.products && response.products.length > 0) {
        // Transform products to frontend format
        const transformedProducts = response.products.map(product => {
          const result = transformProduct(product);
          if (!result) {
            console.error("Transform failed for product:", product.id);
          }
          return result;
        }).filter(Boolean); // Remove any null results
        
        console.log("Transformed products:", transformedProducts.length);
        
        // Return products with pagination
        return NextResponse.json({
          products: transformedProducts.slice(0, limit),
          count: transformedProducts.length
        });
      }
    } catch (clientError) {
      console.error("Medusa client error:", clientError);
    }
    
    // 2. Fallback to old method if the direct client failed
    try {
      // Fetch products from Medusa
      let products = await getProducts();
      
      if (products && products.length > 0) {
        console.log("Products from helper:", `Found ${products.length} products`);
        
        // Transform products to frontend format
        const transformedProducts = products.map(product => {
          const result = transformProduct(product);
          if (!result) {
            console.error("Transform failed for product:", product.id);
          }
          return result;
        }).filter(Boolean);
        
        return NextResponse.json({
          products: transformedProducts.slice(offset, offset + limit),
          count: transformedProducts.length
        });
      }
    } catch (utilsError) {
      console.error("Utils error:", utilsError);
    }
    
    // 3. If still no products, return a test product for debugging
    console.log("No products from any source, returning a test product");
    return NextResponse.json({
      products: [{
        id: 'test-product',
        name: 'Test Product',
        slug: 'test-product',
        currentPrice: 99.99,
        originalPrice: 129.99,
        discount: 23,
        image: '/assets/1.jpg',
        inventory: 100,
        sku: 'test-123'
      }],
      count: 1
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return a fallback test product for debugging
    return NextResponse.json({
      products: [{
        id: 'error-product',
        name: 'Error Product (Server Error)',
        slug: 'error-product',
        currentPrice: 99.99,
        originalPrice: 129.99,
        discount: 23,
        image: '/assets/1.jpg',
        inventory: 100,
        sku: 'error-123'
      }],
      count: 1
    });
  }
} 