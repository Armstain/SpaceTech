import { NextResponse } from 'next/server';
import { deleteFromCloudinary } from '@/utils/cloudinary';

export async function POST(request) {
  try {
    const { publicId } = await request.json();
    
    if (!publicId) {
      return NextResponse.json(
        { error: 'No publicId provided' },
        { status: 400 }
      );
    }

    // Delete from Cloudinary
    const result = await deleteFromCloudinary(publicId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: 'Error deleting image' },
      { status: 500 }
    );
  }
}
