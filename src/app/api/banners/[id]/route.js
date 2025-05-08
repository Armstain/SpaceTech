import { connectToDatabase } from '@/lib/mongodb';
import Banner from '@/models/Banner';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    // Get params asynchronously
    const id = params.id;
    
    const banner = await Banner.findById(id);
    
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    
    return NextResponse.json({ banner }, { status: 200 });
  } catch (error) {
    console.error('Error fetching banner:', error);
    return NextResponse.json({ error: 'Failed to fetch banner' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    
    // Get params asynchronously
    const id = params.id;
    const data = await request.json();
    
    // Validate image data
    if (!data.image || !data.image.url || !data.image.publicId) {
      return NextResponse.json(
        { success: false, message: 'Image URL and publicId are required' },
        { status: 400 }
      );
    }
    
    const updateData = {
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
      updated_at: Date.now()
    };
    
    const banner = await Banner.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    
    return NextResponse.json({ banner }, { status: 200 });
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json({ 
      error: 'Failed to update banner',
      message: error.message 
    }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();
    
    // Get params asynchronously
    const id = params.id;
    const data = await request.json();
    
    // Prepare update data
    const updateData = { ...data, updated_at: Date.now() };
    
    // If image data is provided, ensure it has both url and publicId
    if (data.image) {
      if (!data.image.url || !data.image.publicId) {
        return NextResponse.json(
          { success: false, message: 'If updating image, both URL and publicId are required' },
          { status: 400 }
        );
      }
    }
    
    const banner = await Banner.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    
    return NextResponse.json({ banner }, { status: 200 });
  } catch (error) {
    console.error('Error updating banner:', error);
    return NextResponse.json({ 
      error: 'Failed to update banner',
      message: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    // Get params asynchronously
    const id = params.id;
    
    const banner = await Banner.findByIdAndDelete(id);
    
    if (!banner) {
      return NextResponse.json({ error: 'Banner not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting banner:', error);
    return NextResponse.json({ error: 'Failed to delete banner' }, { status: 500 });
  }
}
