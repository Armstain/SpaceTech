'use client'
import { ShoppingCart, Eye, Heart } from 'lucide-react';
import { useState } from 'react';
import ProductModal from '../modal/ProductModal';

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const products = [
    {
      name: "Mixer grinder",
      currentPrice: 2500.00,
      originalPrice: 3500.00,
      discount: 29,
      image: "/images/mixer.png"
    },
    {
      name: "Smart watch",
      currentPrice: 965.00,
      originalPrice: 1520.00,
      discount: 33,
      image: "/images/smartwatch.png"
    },
    {
      name: "Air buds",
      currentPrice: 1000.00,
      originalPrice: 1650.00,
      discount: 22,
      image: "/images/airbuds.png"
    },
    {
      name: "Hard drive",
      currentPrice: 325.00,
      originalPrice: 325.00,
      discount: 0,
      image: "/images/harddrive.png"
    },
    {
      name: "Smart watch",
      currentPrice: 965.00,
      originalPrice: 1520.00,
      discount: 33,
      image: "/images/smartwatch.png"
    },
    {
      name: "Air buds",
      currentPrice: 1000.00,
      originalPrice: 1650.00,
      discount: 22,
      image: "/images/airbuds.png"
    },
    {
      name: "Hard drive",
      currentPrice: 325.00,
      originalPrice: 325.00,
      discount: 0,
      image: "/images/harddrive.png"
    },
    {
      name: "Hard drive",
      currentPrice: 325.00,
      originalPrice: 325.00,
      discount: 25,
      image: "/images/harddrive.png"
    }
  ];
  
  const openProductModal = (product) => {
    setSelectedProduct(product);
  };
  
  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="bg-base-100">
      <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Feature product</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="bg-base-300 rounded-lg p-6 relative group">
            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-primary text-white text-sm px-2 py-1 rounded">
                -{product.discount}%
              </div>
            )}
            
            {/* Action Icons */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200" title="Add to Cart">
                <ShoppingCart size={20} />
              </button>
              
              <button 
                className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200" 
                title="Quick View"
                onClick={() => openProductModal(product)}
              >
                <Eye size={20} />
              </button>
              
              <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200" title="Add to Wishlist">
                <Heart size={20} />
              </button>
            </div>
            
            <div className="flex justify-center mb-6">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-48 h-48 object-contain"
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-medium mb-2">{product.name}</h3>
              <div className="flex justify-center items-center gap-2">
                <span className="text-secondary font-bold">
                  ${product.currentPrice.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-neutral line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
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
