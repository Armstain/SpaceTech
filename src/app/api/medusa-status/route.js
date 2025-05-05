import { NextResponse } from 'next/server';
import { medusaClient } from '@/lib/medusa/config';

export async function GET() {
  try {
    console.log("Checking Medusa connection status...");
    console.log("Publishable API Key:", process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ? "Set" : "Not Set");
    
    // Try to get store information from Medusa
    const storeResponse = await medusaClient.store.retrieve();
    
    console.log("Successfully connected to Medusa store API");
    
    // Try to list products as an additional check
    try {
      const { products } = await medusaClient.products.list({ limit: 1 });
      console.log("Products check:", products && products.length > 0 ? "Products found" : "No products found");
    } catch (productsError) {
      console.error("Error checking products:", productsError.message);
    }
    
    return NextResponse.json({
      connected: true,
      store: {
        name: storeResponse.store?.name || "Unknown Store",
        id: storeResponse.store?.id || "unknown"
      },
      publishableKeySet: !!process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    });
  } catch (error) {
    console.error('Medusa connection error:', error);
    return NextResponse.json({
      connected: false,
      error: error.message,
      publishableKeySet: !!process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    }, { status: 500 });
  }
} 