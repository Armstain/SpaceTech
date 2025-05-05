import { NextResponse } from 'next/server';
import { getProductByHandle } from '@/lib/medusa/utils'; 
import { transformProduct } from '@/lib/medusa/utils';
import { medusaClient } from '@/lib/medusa/config';

export async function GET(request, { params }) {
  try {
    // Get the slug from URL params
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Product slug is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching product with slug: ${slug}`);

    // First try using the Medusa client directly (which has publishable key)
    try {
      const { products } = await medusaClient.products.list({ handle: slug });
      const product = products?.[0];
      
      if (product) {
        console.log(`Found product with direct client: ${product.id}`);
        // Transform product to frontend format
        const transformedProduct = transformProduct(product);
        return NextResponse.json(transformedProduct);
      }
    } catch (clientError) {
      console.error("Medusa client error:", clientError);
    }

    // Fallback to the old method
    console.log("Trying fallback method...");
    const product = await getProductByHandle(slug);
    
    if (!product) {
      console.log(`No product found with slug: ${slug}`);
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Transform product to frontend format
    const transformedProduct = transformProduct(product);

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the product' },
      { status: 500 }
    );
  }
} 