import { connectToDatabase } from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
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
    
    const { id } = params;
    const data = await request.json();
    
    // Add updated_at timestamp
    data.updated_at = new Date();
    
    const product = await Product.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
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