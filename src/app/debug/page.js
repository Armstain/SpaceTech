'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import GetApiKeyInstructions from './get-api-key';

export default function DebugPage() {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check Medusa connection
  useEffect(() => {
    const checkConnection = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/medusa-status');
        const data = await response.json();
        setConnectionStatus(data);
      } catch (err) {
        setError('Error checking Medusa connection: ' + err.message);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products?limit=5');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Error fetching products: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Medusa Debug Page</h1>
      
      {isLoading ? (
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Connection Status</h2>
            {connectionStatus ? (
              <div>
                <p className="mb-2">
                  Connection: 
                  <span className={connectionStatus.connected ? "text-green-500 ml-2" : "text-red-500 ml-2"}>
                    {connectionStatus.connected ? "Connected" : "Not Connected"}
                  </span>
                </p>
                <p className="mb-2">
                  Publishable API Key: 
                  <span className={connectionStatus.publishableKeySet ? "text-green-500 ml-2" : "text-red-500 ml-2"}>
                    {connectionStatus.publishableKeySet ? "Set" : "Not Set"}
                  </span>
                </p>
                {connectionStatus.connected && connectionStatus.store && (
                  <p>Store: {connectionStatus.store.name}</p>
                )}
                {!connectionStatus.connected && (
                  <div className="text-red-500 mt-4">
                    <p>Error: {connectionStatus.error}</p>
                    <p className="mt-2">Possible solutions:</p>
                    <ul className="list-disc pl-6 mt-1">
                      <li>Ensure Medusa server is running (http://localhost:9000)</li>
                      <li>Check that you have created a publishable API key in Medusa admin</li>
                      <li>Verify that NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is set in .env.local</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p>Unable to check connection</p>
            )}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Products</h2>
            {products ? (
              <div>
                <p className="mb-2">Total products: {products.count}</p>
                {products.products.length > 0 ? (
                  <ul className="list-disc pl-6">
                    {products.products.map(product => (
                      <li key={product.id} className="mb-2">
                        {product.name} - ${product.currentPrice.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-yellow-500">No products found in the database</p>
                )}
              </div>
            ) : (
              <p>Unable to fetch products</p>
            )}
          </div>

          {error && (
            <div className="bg-red-100 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4 text-red-700">Error</h2>
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {!connectionStatus?.publishableKeySet && (
            <GetApiKeyInstructions />
          )}

          <div className="mt-8">
            <Link href="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
} 