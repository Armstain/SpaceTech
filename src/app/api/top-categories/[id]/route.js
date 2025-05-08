import { connectToDatabase } from '@/lib/mongodb';
import TopCategory from '@/models/TopCategory';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    // Get params asynchronously
    const id = params.id;
    
    const topCategory = await TopCategory.findById(id);
    
    if (!topCategory) {
      return NextResponse.json({ error: 'Top category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ topCategory }, { status: 200 });
  } catch (error) {
    console.error('Error fetching top category:', error);
    return NextResponse.json({ error: 'Failed to fetch top category' }, { status: 500 });
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
    
    // Check if this is a main category and there's already one
    if (data.isMainCategory) {
      const existingMain = await TopCategory.findOne({ 
        isMainCategory: true,
        _id: { $ne: id } // Exclude the current category
      });
      
      if (existingMain) {
        // Update the existing main category to not be main anymore
        await TopCategory.findByIdAndUpdate(existingMain._id, { isMainCategory: false });
      }
    }
    
    const updateData = {
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
      updated_at: Date.now()
    };
    
    const topCategory = await TopCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!topCategory) {
      return NextResponse.json({ error: 'Top category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ topCategory }, { status: 200 });
  } catch (error) {
    console.error('Error updating top category:', error);
    return NextResponse.json({ 
      error: 'Failed to update top category',
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
    
    // Check if this is a main category and there's already one
    if (data.isMainCategory) {
      const existingMain = await TopCategory.findOne({ 
        isMainCategory: true,
        _id: { $ne: id } // Exclude the current category
      });
      
      if (existingMain) {
        // Update the existing main category to not be main anymore
        await TopCategory.findByIdAndUpdate(existingMain._id, { isMainCategory: false });
      }
    }
    
    const topCategory = await TopCategory.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!topCategory) {
      return NextResponse.json({ error: 'Top category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ topCategory }, { status: 200 });
  } catch (error) {
    console.error('Error updating top category:', error);
    return NextResponse.json({ 
      error: 'Failed to update top category',
      message: error.message 
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    // Get params asynchronously
    const id = params.id;
    
    const topCategory = await TopCategory.findByIdAndDelete(id);
    
    if (!topCategory) {
      return NextResponse.json({ error: 'Top category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting top category:', error);
    return NextResponse.json({ error: 'Failed to delete top category' }, { status: 500 });
  }
}
