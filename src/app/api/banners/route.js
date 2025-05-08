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
    
    // Validate image data
    if (!data.image || !data.image.url || !data.image.publicId) {
      return NextResponse.json(
        { success: false, message: 'Image URL and publicId are required' },
        { status: 400 }
      );
    }
    
    const banner = await Banner.create({
      title: data.title,
      description: data.description,
      originalPrice: data.originalPrice,
      salePrice: data.salePrice,
      discount: data.discount,
      image: {
        url: data.image.url,
        publicId: data.image.publicId
      },
      imageAlt: data.imageAlt,
      expiryHours: data.expiryHours,
      isActive: data.isActive !== undefined ? data.isActive : true,
      order: data.order || 0,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    return NextResponse.json({ success: true, data: banner }, { status: 201 });
  } catch (error) {
    console.error('Error creating banner:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create banner', 
        error: error.message 
      },
      { status: 500 }
    );
  }
}
