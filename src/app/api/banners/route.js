import { connectToDatabase } from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    // Get all banners ordered by their display order
    const banners = await Banner.find({})
      .sort({ order: 1 });
    
    return NextResponse.json({ success: true, data: banners });
  } catch (error) {
    console.error('Error fetching banners:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    // Calculate discount if not provided but originalPrice and salePrice are
    if (!data.discount && data.originalPrice && data.salePrice) {
      const discount = Math.round(((data.originalPrice - data.salePrice) / data.originalPrice) * 100);
      data.discount = discount > 0 ? discount : 0;
    }
    
    const banner = await Banner.create({
      ...data,
      isActive: data.isActive !== undefined ? data.isActive : true,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    return NextResponse.json({ success: true, data: banner }, { status: 201 });
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create banner' },
      { status: 500 }
    );
  }
}
