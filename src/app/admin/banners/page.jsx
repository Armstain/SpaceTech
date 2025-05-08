'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  Clock
} from 'lucide-react';
import Image from 'next/image';

export default function BannersAdmin() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/banners');
      
      if (!response.ok) {
        throw new Error('Failed to fetch banners');
      }
      
      const data = await response.json();
      setBanners(data.data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (banner) => {
    setBannerToDelete(banner);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/banners/${bannerToDelete._id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete banner');
      }
      
      // Refresh banners
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setBannerToDelete(null);
    }
  };

  const toggleBannerStatus = async (banner) => {
    try {
      const response = await fetch(`/api/banners/${banner._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          isActive: !banner.isActive 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update banner status');
      }
      
      // Refresh banners
      fetchBanners();
    } catch (error) {
      console.error('Error updating banner status:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Banners</h1>
          <p className="text-gray-600">Manage your homepage banners</p>
        </div>
        <Link 
          href="/admin/banners/new"
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle className="mr-2" size={20} />
          Add Banner
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : banners.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No banners found</p>
            <Link 
              href="/admin/banners/new"
              className="inline-flex items-center text-primary hover:text-primary-dark"
            >
              <PlusCircle className="mr-2" size={16} />
              Create your first banner
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Banner</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Title</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Price</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Discount</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Expiry</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {banners.map(banner => (
                  <tr key={banner._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="h-16 w-24 relative rounded-md overflow-hidden">
                        {banner.imageSrc ? (
                          <Image
                            src={banner.imageSrc}
                            alt={banner.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                            No img
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-medium">{banner.title}</span>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{banner.description}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col">
                        <span className="font-medium">${banner.salePrice?.toFixed(2)}</span>
                        {banner.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${banner.originalPrice?.toFixed(2)}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {banner.discount > 0 ? (
                        <span className="px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs">
                          {banner.discount}% OFF
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center text-gray-600">
                        <Clock size={16} className="mr-1" />
                        <span>{banner.expiryHours} hours</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleBannerStatus(banner)}
                        className={`px-2 py-1 rounded-full text-xs ${
                          banner.isActive 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {banner.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end space-x-2">
                        <Link 
                          href={`/admin/banners/${banner._id}/preview`}
                          className="p-1 text-gray-500 hover:text-gray-700 rounded-md hover:bg-gray-100"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link 
                          href={`/admin/banners/${banner._id}/edit`}
                          className="p-1 text-blue-500 hover:text-blue-700 rounded-md hover:bg-blue-50"
                        >
                          <Edit size={18} />
                        </Link>
                        <button 
                          onClick={() => handleDeleteClick(banner)}
                          className="p-1 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete "{bannerToDelete?.title}"?
              <br />
              <span className="text-red-500 text-sm">This action cannot be undone.</span>
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setBannerToDelete(null);
                }}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
