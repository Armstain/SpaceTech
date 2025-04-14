'use client'
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useState } from 'react';
import ProductModal from '../modal/ProductModal';
import Link from 'next/link';
import product1 from '@/public/assets/1.jpg'
import product2 from '@/public/assets/2.jpg'
import product3 from '@/public/assets/3.jpg'
import product4 from '@/public/assets/4.jpg'
import product5 from '@/public/assets/5.jpg'
import product6 from '@/public/assets/6.jpg'
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { toast } from 'react-hot-toast';

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem } = useCart();
  
  const products = [
    {
      id: 1,
      name: "Mixer grinder",
      slug: "mixer-grinder",
      currentPrice: 2500.00,
      originalPrice: 3500.00,
      discount: 29,
      image: product1,
      inventory: 75,
      sku: "mixer-29"
    },
    {
      id: 2,
      name: "Smart watch",
      slug: "smart-watch",
      currentPrice: 965.00,
      originalPrice: 1520.00,
      discount: 33,
      image: product2,
      inventory: 85,
      sku: "watch-33"
    },
    {
      id: 3,
      name: "Air buds",
      slug: "airbuds",
      currentPrice: 1000.00,
      originalPrice: 1650.00,
      discount: 22,
      image: product3,
      inventory: 90,
      sku: "airbuds-22"
    },
    {
      id: 4,
      name: "Hard drive",
      slug: "harddrive",
      currentPrice: 325.00,
      originalPrice: 325.00,
      discount: 0,
      image: product4,
      inventory: 100,
      sku: "harddrive-0"
    },
    {
      id: 5,
      name: "Smart watch",
      slug: "smart-watch",
      currentPrice: 965.00,
      originalPrice: 1520.00,
      discount: 33,
      image: product5
    },
    {
      id: 6,
      name: "Air buds",
      slug: "air-buds",
      currentPrice: 1000.00,
      originalPrice: 1650.00,
      discount: 22,
      image: product6
    },
    {
      id: 7,
      name: "Hard drive",
      slug: "hard-drive",
      currentPrice: 325.00,
      originalPrice: 325.00,
      discount: 0,
      image: product4
    },
    {
      id: 8,
      name: "Hard drive",
      slug: "hard-drive-2",
      currentPrice: 325.00,
      originalPrice: 325.00,
      discount: 25,
      image: product4
    }
  ];
  
  const openProductModal = (product) => {
    setSelectedProduct(product);
  };
  
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product, event) => {
    event.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.currentPrice,
      image: product.image.src,
      quantity: 1
    });
    
    // Show toast notification if you have toast set up
    // If not, you can install react-hot-toast or any other library
    if (typeof toast !== 'undefined') {
      toast.success(`${product.name} added to cart!`);
    } else {
      alert(`${product.name} added to cart!`);
    }
  };

  return (
    <div className="bg-base-100">
      <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Feature product</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group relative">
            <div className="relative overflow-hidden">
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold uppercase px-3 py-1 rounded-full z-10">
                  {product.discount}% OFF
                </div>
              )}
              
              <Link href={`/products/${product.slug}`} className="block cursor-pointer">
                <div className="h-64 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name} 
                    width={300}
                    height={300}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </Link>
              
              {/* Action Buttons Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button 
                  className="bg-white p-3 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300" 
                  title="Add to Cart"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <ShoppingCart size={18} />
                </button>
                
                <button 
                  className="bg-white p-3 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75" 
                  title="Quick View"
                  onClick={() => openProductModal(product)}
                >
                  <Eye size={18} />
                </button>
                
                <button className="bg-white p-3 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150" title="Add to Wishlist">
                  <Heart size={18} />
                </button>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors duration-200">
                <Link href={`/products/${product.slug}`}>
                  {product.name}
                </Link>
              </h3>
              
              <div className="flex items-center gap-2 mb-2">
                <span className="text-primary font-bold text-lg">
                  ${product.currentPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-gray-400 line-through text-sm">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              {product.inventory && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full" 
                      style={{ width: `${(product.inventory / 100) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {product.inventory > 50 ? 'In stock' : 'Low stock'}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Product Quick View Modal */}
    {selectedProduct && (
      <ProductModal 
        product={selectedProduct} 
        onClose={closeProductModal} 
      />
    )}
    </div>
  );
};

export default FeaturedProducts;
