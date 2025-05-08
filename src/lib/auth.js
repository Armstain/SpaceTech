'use client'

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Custom hook to check if the user is authenticated
 * @returns {Object} Session data and loading state
 */
export function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  
  return { session, loading, isAuthenticated };
}

/**
 * Custom hook to check if the user is an admin
 * Redirects to login page if not authenticated or not an admin
 */
export function useAdminProtected() {
  const { session, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else if (!loading && isAuthenticated && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [loading, isAuthenticated, session, router]);
  
  return { session, loading, isAdmin: isAuthenticated && session?.user?.role === 'admin' };
}

/**
 * Custom hook to check if the user is authenticated
 * Redirects to login page if not authenticated
 */
export function useAuthProtected() {
  const { session, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);
  
  return { session, loading, isAuthenticated };
}
