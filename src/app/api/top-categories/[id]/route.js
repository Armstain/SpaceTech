import { connectToDatabase } from '@/lib/mongodb';
import TopCategory from '@/models/TopCategory';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
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
    
    const { id } = params;
    const data = await request.json();
    
    const topCategory = await TopCategory.findByIdAndUpdate(
      id,
      { ...data, updated_at: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!topCategory) {
      return NextResponse.json({ error: 'Top category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ topCategory }, { status: 200 });
  } catch (error) {
    console.error('Error updating top category:', error);
    return NextResponse.json({ error: 'Failed to update top category' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
    const data = await request.json();
    
    const topCategory = await TopCategory.findByIdAndUpdate(
      id,
      { ...data, updated_at: Date.now() },
      { new: true, runValidators: true }
    );
    
    if (!topCategory) {
      return NextResponse.json({ error: 'Top category not found' }, { status: 404 });
    }
    
    return NextResponse.json({ topCategory }, { status: 200 });
  } catch (error) {
    console.error('Error updating top category:', error);
    return NextResponse.json({ error: 'Failed to update top category' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    
    const { id } = params;
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
