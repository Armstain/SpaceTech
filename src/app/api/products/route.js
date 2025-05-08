import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const query = category ? { category } : {};
    
    const products = await Product.find(query).sort({ created_at: -1 });
    
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    // Validate that we have at least one image
    if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
      return NextResponse.json(
        { success: false, message: 'At least one image is required' },
        { status: 400 }
      );
    }
    
    // Validate each image has url and publicId
    for (const img of data.images) {
      if (!img.url || !img.publicId) {
        return NextResponse.json(
          { success: false, message: 'Each image must have a URL and publicId' },
          { status: 400 }
        );
      }
    }
    
    // Create the product with validated data
    const productData = {
      title: data.title,
      description: data.description,
      price: data.price,
      originalPrice: data.originalPrice,
      images: data.images,
      image: data.image || data.images[0].url, // Use the first image URL as the main image if not specified
      category: data.category,
      variants: data.variants || [],
      options: data.options || [],
      status: data.status || 'draft',
      isFeatured: data.isFeatured || false,
      created_at: new Date(),
      updated_at: new Date()
    };
    
    const product = await Product.create(productData);
    
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ 
      error: 'Failed to create product',
      message: error.message 
    }, { status: 500 });
  }
} 