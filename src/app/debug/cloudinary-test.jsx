'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Upload } from 'lucide-react'

export default function CloudinaryTest() {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [error, setError] = useState('')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setIsUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'test')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const result = await response.json()
      setUploadedImage(result)
      console.log('Upload successful:', result)
    } catch (err) {
      console.error('Error uploading image:', err)
      setError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDeleteImage = async () => {
    if (!uploadedImage || !uploadedImage.publicId) return

    setIsUploading(true)
    setError('')

    try {
      const response = await fetch('/api/upload/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ publicId: uploadedImage.publicId }),
      })

      if (!response.ok) {
        throw new Error('Failed to delete image')
      }

      const result = await response.json()
      setUploadedImage(null)
      console.log('Delete successful:', result)
    } catch (err) {
      console.error('Error deleting image:', err)
      setError('Failed to delete image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Cloudinary Integration Test</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Upload Image</h2>
        
        <div className="border-2 border-dashed rounded-lg p-4 text-center border-gray-300">
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isUploading}
          />
          
          <label 
            htmlFor="image" 
            className={`cursor-pointer flex flex-col items-center ${isUploading ? 'opacity-50' : ''}`}
          >
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-gray-600 font-medium">
              {isUploading ? 'Uploading...' : 'Click to upload image'}
            </span>
            <span className="text-gray-500 text-sm mt-1">
              PNG, JPG, GIF up to 5MB
            </span>
          </label>
        </div>
      </div>
      
      {uploadedImage && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Uploaded Image</h2>
          
          <div className="space-y-4">
            <div className="relative h-64 w-full rounded-md overflow-hidden border border-gray-200">
              {uploadedImage && uploadedImage.url && typeof uploadedImage.url === 'string' && uploadedImage.url.length > 0 ? (
                <Image
                  src={uploadedImage.url}
                  alt="Uploaded image"
                  fill
                  className="object-contain"
                  unoptimized={uploadedImage.url.startsWith('blob:')}
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-gray-100">
                  <p className="text-gray-500">Image preview not available</p>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <p><strong>URL:</strong> <a href={uploadedImage.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 break-all">{uploadedImage.url}</a></p>
              <p><strong>Public ID:</strong> <span className="break-all">{uploadedImage.publicId}</span></p>
            </div>
            
            <button
              type="button"
              onClick={handleDeleteImage}
              disabled={isUploading}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isUploading ? 'Deleting...' : 'Delete Image'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
