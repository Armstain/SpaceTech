'use client'

import { useState } from 'react';
import Link from 'next/link';
import { Trash, Plus, Minus } from 'lucide-react';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Smart watch",
      price: 965.00,
      quantity: 1,
      image: "/images/smartwatch.png"
    },
    {
      id: 3,
      name: "Air buds",
      price: 1000.00,
      quantity: 2,
      image: "/images/airbuds.png"
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15.00;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Add some products to your cart to continue shopping</p>
          <Link 
            href="/products"
            className="bg-primary text-white py-3 px-6 rounded-md inline-block"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Product</th>
                    <th className="text-center p-4">Price</th>
                    <th className="text-center p-4">Quantity</th>
                    <th className="text-right p-4">Total</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <tr key={item.id} className="border-b">
                      <td className="p-4">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-contain mr-4" 
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="text-center p-4">
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 border rounded-l"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-1 border-t border-b">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 border rounded-r"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="text-right p-4 font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 p-1"
                        >
                          <Trash size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="block w-full bg-primary text-white text-center py-3 rounded-md font-medium"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                href="/products"
                className="block w-full text-center mt-4 text-primary hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 