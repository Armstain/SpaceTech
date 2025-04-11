'use client'

import { useState } from 'react';

export function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          <button 
            onClick={() => setActiveTab('description')}
            className={`py-2 px-4 ${activeTab === 'description' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
          >
            Description
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`py-2 px-4 ${activeTab === 'info' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
          >
            Additional Information
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`py-2 px-4 ${activeTab === 'reviews' ? 'border-b-2 border-primary text-primary font-medium' : 'text-gray-600'}`}
          >
            Reviews
          </button>
        </div>
      </div>
      
      <div className="prose max-w-none">
        {activeTab === 'description' && (
          <>
            <p>
              The {product.name} is designed for durability and performance. 
              It features the latest technology to ensure smooth operation and reliability.
            </p>
            <p>
              Water-resistant and durable, this device is built to withstand your active lifestyle.
              Stay connected with notifications from your smartphone and track your health metrics with precision.
            </p>
          </>
        )}
        {/* Add content for other tabs as needed */}
      </div>
    </div>
  );
}