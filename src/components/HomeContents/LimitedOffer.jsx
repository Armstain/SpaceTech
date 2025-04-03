'use client';

import { ShoppingBag, Eye, Heart } from 'lucide-react';
import Countdown from 'react-countdown';

const LimitedOffer = () => {
  const products = [
    {
      name: "DSLR camera",
      currentPrice: 1022.00,
      originalPrice: 12500.00,
      image: "/images/camera.png",
      endTime: Date.now() + 29837456000, 
    },
    {
      name: "Mixer grinder",
      currentPrice: 2500.00,
      originalPrice: 3500.00,
      image: "/images/mixer.png",
      endTime: Date.now() + 32637456000, 
    },
  ];

  const CountdownRenderer = ({ days, hours, minutes, seconds }) => (
    <div className="flex gap-2 mt-4">
      <div className="bg-secondary text-white rounded-lg p-2 min-w-[60px] text-center">
        <div className="text-xl font-bold">{days}</div>
        <div className="text-xs">Day</div>
      </div>
      <div className="bg-secondary text-white rounded-lg p-2 min-w-[60px] text-center">
        <div className="text-xl font-bold">{hours}</div>
        <div className="text-xs">Hrs</div>
      </div>
      <div className="bg-secondary text-white rounded-lg p-2 min-w-[60px] text-center">
        <div className="text-xl font-bold">{minutes}</div>
        <div className="text-xs">Min</div>
      </div>
      <div className="bg-secondary text-white rounded-lg p-2 min-w-[60px] text-center">
        <div className="text-xl font-bold">{seconds}</div>
        <div className="text-xs">sec</div>
      </div>
    </div>
  );

  return (
    <div className="bg-base-200">
        <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">Limited time offer</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {products.map((product, index) => (
          <div key={index} className="bg-white rounded-lg p-8 relative group border">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Product Image */}
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-64 h-64 object-contain"
                />
              </div>

              {/* Product Details */}
              <div>
                <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-secondary font-bold text-xl">
                    ${product.currentPrice.toFixed(2)}
                  </span>
                  <span className="text-neutral line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
                
                <Countdown 
                  date={product.endTime}
                  renderer={CountdownRenderer}
                />

                {/* Action Icons */}
                <div className="flex gap-2 mt-4">
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                    <ShoppingBag size={20} />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                    <Eye size={20} />
                  </button>
                  <button className="bg-white p-2 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors duration-200">
                    <Heart size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default LimitedOffer;
