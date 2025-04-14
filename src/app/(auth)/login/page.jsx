'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login attempt with:', email, password);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Login to Your Account</h1>
      
      <form onSubmit={handleSubmit} className="bg-base-300 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded font-medium hover:bg-primary-dark transition-colors"
        >
          Login
        </button>
        
        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        
        <div className="mt-6 text-center">
          <p>
            Don't have an account?{' '}
            <Link href="/register" className="text-primary hover:underline">
              Register
              
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
} 