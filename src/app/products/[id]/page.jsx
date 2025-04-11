// Move data fetching to a separate file
import { ProductActions } from '@/components/product/ProductActions';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductTabs } from '@/components/product/ProductTabs';
import { getProductBySlug } from '@/lib/products';

import Link from 'next/link';

export async function generateMetadata({ params }) {
  const product = await getProductBySlug(params.slug);
  return {
    title: `${product.name} - Your Store`,
    description: `Buy ${product.name} - Features high-resolution display and long battery life.`
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug);
  
  

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb - stays in server component */}
      <div className="flex items-center gap-2 text-sm mb-8">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <span className="text-primary">{product.name}</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery product={product} />
        
        <div>
          {/* Static product details */}
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="text-primary text-2xl font-bold">
              ${product.currentPrice.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <>
                <span className="text-gray-500 line-through text-xl">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="bg-primary text-white text-sm px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              </>
            )}
          </div>

          <p className="text-gray-600 mb-6">
            The {product.name} features a high-resolution display that's visible even in bright sunlight.
            With the latest hardware, it delivers smooth performance for all your daily tasks.
            Its battery life ensures you can go days without needing to charge.
          </p>

          {/* Interactive elements - client component */}
          <ProductActions
            product={product}
          />

          {/* Static elements */}
          <div className="mb-6">
            <span className="font-semibold">Sku:</span> {product.sku}
          </div>
          
          {/* Payment methods */}
          <div className="flex gap-2">
            <img src="/images/visa.png" alt="Visa" className="h-8 w-auto" />
            <img src="/images/paypal.png" alt="PayPal" className="h-8 w-auto" />
            <img src="/images/mastercard.png" alt="Mastercard" className="h-8 w-auto" />
            <img src="/images/amex.png" alt="American Express" className="h-8 w-auto" />
          </div>
        </div>
      </div>
      
      {/* Tabs section - client component */}
      <ProductTabs product={product} />
    </div>
  );
} 