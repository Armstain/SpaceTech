'use client';

import { useState } from 'react';
import { ShoppingBag, Eye, Heart } from 'lucide-react';
import Countdown from 'react-countdown';
import ProductModal from '../modal/ProductModal';
import Image from 'next/image';
import image1 from '@/public/assets/1.jpg';
import image2 from '@/public/assets/2.jpg';

const LimitedOffer = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: "DSLR camera",
      currentPrice: 1022.00,
      originalPrice: 12500.00,
      image: image1, 
      width: 800, 
      height: 600, 
      endTime: Date.now() + 29837456000,  
      inventory: 5,
      discount: 20 
    },
    {
      name: "Mixer grinder",
      currentPrice: 2500.00,
      originalPrice: 3500.00,
      image: image2, 
      width: 800, 
      height: 600,
      endTime: Date.now() + 32637456000,
      inventory: 8,
      discount: 15
    },
  ];

  const CountdownRenderer = ({ days, hours, minutes, seconds }) => (
    <div className="flex gap-1 sm:gap-2 mt-4 flex-wrap">
      <div className="bg-secondary text-white rounded-lg p-1 sm:p-2 min-w-[45px] sm:min-w-[60px] text-center">
        <div className="text-base sm:text-xl font-bold">{days}</div>
        <div className="text-[10px] sm:text-xs">Day</div>
      </div>
      <div className="bg-secondary text-white rounded-lg p-1 sm:p-2 min-w-[45px] sm:min-w-[60px] text-center">
        <div className="text-base sm:text-xl font-bold">{hours}</div>
        <div className="text-[10px] sm:text-xs">Hrs</div>
      </div>
      <div className="bg-secondary text-white rounded-lg p-1 sm:p-2 min-w-[45px] sm:min-w-[60px] text-center">
        <div className="text-base sm:text-xl font-bold">{minutes}</div>
        <div className="text-[10px] sm:text-xs">Min</div>
      </div>
      <div className="bg-secondary text-white rounded-lg p-1 sm:p-2 min-w-[45px] sm:min-w-[60px] text-center">
        <div className="text-base sm:text-xl font-bold">{seconds}</div>
        <div className="text-[10px] sm:text-xs">sec</div>
      </div>
    </div>
  );

  return (
    <div className="bg-base-200">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <h2 className="text-2xl sm:text-4xl font-bold text-center mb-6 sm:mb-12">Limited time offer</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg p-4 sm:p-8 relative group border">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
                {/* Product Image */}
                <div className="relative w-full sm:w-auto">
                  <Image
                    src={product.image} 
                    alt={product.name} 
                    width={product.width}
                    height={product.height}
                    className="w-full h-auto rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Product Details */}
                <div className="text-center sm:text-left w-full sm:w-auto">
                  <h3 className="text-lg sm:text-xl font-medium mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-4 justify-center sm:justify-start">
                    <span className="text-secondary font-bold text-lg sm:text-xl">
                      ${product.currentPrice.toFixed(2)}
                    </span>
                    <span className="text-neutral line-through text-sm sm:text-base">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                  
                  <Countdown 
                    date={product.endTime}
                    renderer={CountdownRenderer}
                  />

                  {/* Action Icons */}
                  <div className="flex gap-2 mt-4 justify-center sm:justify-start">
                    <button className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                      <ShoppingBag size={18} />
                    </button>
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200"
                    >
                      <Eye size={18} />
                    </button>
                    <button className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                      <Heart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default LimitedOffer;
