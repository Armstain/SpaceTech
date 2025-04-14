'use client'
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Truck, Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

const ProductModal = ({ product, onClose }) => {
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();
  
  // Mock product images (in a real app, these would come from the product data)
  const productImages = [
    product.image,
    
  ];
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };
  
  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.currentPrice,
      image: product.image.src,
      quantity: quantity
    });
    
    // Optional: close modal after adding to cart
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div 
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10"
        >
          <X size={24} />
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Left side - Product images */}
          <div className="relative">
            <div className="mb-6 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-80">
              <Image
                src={productImages[currentImageIndex]} 
                alt={product.name} 
                className="max-h-full object-contain"
              />
              
              <button 
                onClick={prevImage}
                className="absolute left-2 bg-white rounded-full p-1 shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={nextImage}
                className="absolute right-2 bg-white rounded-full p-1 shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Thumbnail navigation */}
            <div className="flex gap-2 overflow-x-auto">
              {productImages.map((img, index) => (
                <button 
                  key={index}
                  className={`border-2 p-1 rounded ${currentImageIndex === index ? 'border-primary' : 'border-gray-200'}`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img src={img} alt="" className="h-16 w-16 object-contain" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side - Product details */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary text-xl font-bold">
                ${product.currentPrice.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              {product.discount > 0 && (
                <span className="bg-primary text-white text-sm px-2 py-1 rounded">
                  -{product.discount}%
                </span>
              )}
            </div>
            
            <div className="mb-4 flex items-center gap-2">
              <span className="font-semibold">Availability:</span>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>{product.inventory} in stock</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="font-semibold mb-2">Color: {selectedColor}</div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedColor('Black')}
                  className={`w-8 h-8 rounded-full bg-black ${selectedColor === 'Black' ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                ></button>
                <button 
                  onClick={() => setSelectedColor('Grey')}
                  className={`w-8 h-8 rounded-full bg-gray-400 ${selectedColor === 'Grey' ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                ></button>
                <button 
                  onClick={() => setSelectedColor('Silver')}
                  className={`w-8 h-8 rounded-full bg-gray-200 ${selectedColor === 'Silver' ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                ></button>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="font-semibold mb-2">Quantity:</div>
              <div className="flex items-center">
                <button 
                  onClick={handleQuantityDecrease}
                  className="border border-gray-300 w-10 h-10 flex items-center justify-center text-xl"
                >
                  -
                </button>
                <div className="border-t border-b border-gray-300 w-16 h-10 flex items-center justify-center">
                  {quantity}
                </div>
                <button 
                  onClick={handleQuantityIncrease}
                  className="border border-gray-300 w-10 h-10 flex items-center justify-center text-xl"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex gap-4 mb-6">
              <button 
                onClick={handleAddToCart}
                className="bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>
              <button className="bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary-dark transition">
                BUY IT NOW
              </button>
            </div>
            
            <div className="flex items-center mb-4 text-gray-600">
              <Truck className="mr-2" />
              <span>Item will be delivered on or before</span>
            </div>
            
            <div className="mb-4">
              <span className="font-semibold">Sku:</span> abccd-16
            </div>
            
            <div>
              <div className="font-semibold mb-2">Share:</div>
              <div className="flex gap-2">
                <button className="text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </button>
                <button className="text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </button>
                <button className="text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Payment methods */}
            <div className="mt-6 flex gap-2">
              <img src="/images/visa.png" alt="Visa" className="h-8 w-auto" />
              <img src="/images/paypal.png" alt="PayPal" className="h-8 w-auto" />
              <img src="/images/mastercard.png" alt="Mastercard" className="h-8 w-auto" />
              <img src="/images/amex.png" alt="American Express" className="h-8 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
