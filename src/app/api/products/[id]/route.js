import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    // Get params asynchronously
    const id = params.id;
    
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    
    // Get params asynchronously
    const id = params.id;
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
    
    // Create the update data with validated fields
    const updateData = {
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
      updated_at: new Date()
    };
    
    const product = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ 
      error: 'Failed to update product',
      message: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    // Get params asynchronously
    const id = params.id;
    
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
} 