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
    const product = await Product.create(data);
    
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
} 