import { connectToDatabase } from '@/lib/mongodb';
import TopCategory from '@/models/TopCategory';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectToDatabase();
    
    // Get active top categories ordered by their display order
    const topCategories = await TopCategory.find({})
      .sort({ order: 1 });
    
    return NextResponse.json({ success: true, data: topCategories });
  } catch (error) {
    console.error('Error fetching top categories:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch top categories' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectToDatabase();
    
    const data = await request.json();
    
    // Validate image data
    if (!data.image || !data.image.url || !data.image.publicId) {
      return NextResponse.json(
        { success: false, message: 'Image URL and publicId are required' },
        { status: 400 }
      );
    }
    
    // Check if this is a main category and there's already one
    if (data.isMainCategory) {
      const existingMain = await TopCategory.findOne({ isMainCategory: true });
      if (existingMain) {
        // Update the existing main category to not be main anymore
        await TopCategory.findByIdAndUpdate(existingMain._id, { isMainCategory: false });
      }
    }
    
    const topCategory = await TopCategory.create({
      name: data.name,
      price: data.price,
      image: {
        url: data.image.url,
        publicId: data.image.publicId
      },
      backgroundColor: data.backgroundColor || 'bg-base-300',
      isMainCategory: data.isMainCategory || false,
      order: data.order || 0,
      isActive: data.isActive !== undefined ? data.isActive : true,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    return NextResponse.json({ success: true, data: topCategory }, { status: 201 });
  } catch (error) {
    console.error('Error creating top category:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create top category',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
