import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads an image to Cloudinary
 * @param {string} file - The file to upload (can be a base64 string or a file path)
 * @param {string} folder - The folder to upload to in Cloudinary
 * @returns {Promise<{url: string, publicId: string}>} - The URL and public ID of the uploaded image
 */
export const uploadToCloudinary = async (file, folder = "products") => {
  try {
    const result = await cloudinary.uploader.upload(file, { 
      folder: folder,
      resource_type: 'auto'
    });
    
    return { 
      url: result.secure_url, 
      publicId: result.public_id 
    };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

/**
 * Deletes an image from Cloudinary
 * @param {string} publicId - The public ID of the image to delete
 * @returns {Promise<{result: string}>} - The result of the deletion
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return { result };
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    throw error;
  }
};

export default cloudinary;
