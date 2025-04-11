'use client'

import { useState } from 'react';
import { ShoppingCart, Heart, Truck } from 'lucide-react';

export function ProductActions({ product }) {
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <>
      <div className="mb-6 flex items-center gap-2">
        <span className="font-semibold">Availability:</span>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span>{product.inventory} in stock</span>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="font-semibold mb-2">Color: {selectedColor}</div>
        <div className="flex gap-2">
          <button 
            onClick={() => setSelectedColor('Black')}
            className={`w-8 h-8 rounded-full bg-black ${selectedColor === 'Black' ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
            aria-label="Black color"
          ></button>
          <button 
            onClick={() => setSelectedColor('Grey')}
            className={`w-8 h-8 rounded-full bg-gray-400 ${selectedColor === 'Grey' ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
            aria-label="Grey color"
          ></button>
          <button 
            onClick={() => setSelectedColor('Silver')}
            className={`w-8 h-8 rounded-full bg-gray-200 ${selectedColor === 'Silver' ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
            aria-label="Silver color"
          ></button>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="font-semibold mb-2">Quantity:</div>
        <div className="flex items-center">
          <button 
            onClick={decreaseQuantity}
            className="border border-gray-300 w-10 h-10 flex items-center justify-center text-xl"
          >
            -
          </button>
          <div className="border-t border-b border-gray-300 w-16 h-10 flex items-center justify-center">
            {quantity}
          </div>
          <button 
            onClick={increaseQuantity}
            className="border border-gray-300 w-10 h-10 flex items-center justify-center text-xl"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <button className="bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition flex items-center gap-2">
          <ShoppingCart size={20} />
          ADD TO CART
        </button>
        <button className="bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition">
          BUY IT NOW
        </button>
        <button className="border border-gray-300 p-3 rounded-lg hover:bg-gray-100">
          <Heart size={20} />
        </button>
      </div>
      
      <div className="flex items-center mb-6 text-gray-600">
        <Truck className="mr-2" />
        <span>Item will be delivered on or before Apr 21 2025</span>
      </div>
    </>
  );
}