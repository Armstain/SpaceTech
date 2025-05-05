import { medusaClient, handleError } from "./config"

// Product operations
export const getProducts = async () => {
  try {
    const { products } = await medusaClient.products.list()
    return products
  } catch (error) {
    handleError(error)
  }
}

export const getProductById = async (id) => {
  try {
    const { product } = await medusaClient.products.retrieve(id)
    return product
  } catch (error) {
    handleError(error)
  }
}

// Cart operations
export const createCart = async () => {
  try {
    const { cart } = await medusaClient.carts.create()
    return cart
  } catch (error) {
    handleError(error)
  }
}

export const addToCart = async (cartId, variantId, quantity) => {
  try {
    const { cart } = await medusaClient.carts.lineItems.create(cartId, {
      variant_id: variantId,
      quantity,
    })
    return cart
  } catch (error) {
    handleError(error)
  }
}

/**
 * Format product price
 * @param {number} amount - The price amount
 * @param {string} currencyCode - Currency code (e.g., USD)
 * @returns {string} - Formatted price
 */
export function formatPrice(amount, currencyCode = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount / 100); // Medusa stores prices in cents
}

/**
 * Calculate discount percentage
 * @param {number} originalPrice - Original price
 * @param {number} discountedPrice - Discounted price
 * @returns {number} - Discount percentage
 */
export function calculateDiscount(originalPrice, discountedPrice) {
  if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) {
    return 0;
  }
  
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}

/**
 * Get thumbnail URL from product
 * @param {Object} product - Medusa product object
 * @returns {string} - Thumbnail URL or placeholder
 */
export function getThumbnail(product) {
  if (product.thumbnail) {
    return product.thumbnail;
  }
  
  if (product.images && product.images.length > 0) {
    return product.images[0].url;
  }
  
  return '/assets/placeholder.jpg'; // Default placeholder
}

/**
 * Transform Medusa product to frontend format
 * @param {Object} product - Medusa product
 * @returns {Object} - Transformed product
 */
export function transformProduct(product) {
  try {
    if (!product) {
      console.error('Received null or undefined product to transform');
      return null;
    }
    
    const variant = product.variants && product.variants.length > 0 ? product.variants[0] : {};
    let price = 0;
    let originalPrice = 0;
    
    // Handle prices safely
    if (variant.prices && variant.prices.length > 0) {
      price = variant.prices[0].amount || 0;
    }
    
    // Use original_price if available, otherwise use the regular price
    originalPrice = variant.original_price || price;
    
    // If originalPrice is still 0 but we have a price, set originalPrice to price
    if (originalPrice === 0 && price > 0) {
      originalPrice = price;
    }
    
    // Ensure we have an image
    let imageUrl = '/assets/placeholder.jpg';
    if (product.thumbnail) {
      imageUrl = product.thumbnail;
    } else if (product.images && product.images.length > 0) {
      imageUrl = product.images[0].url;
    }
    
    return {
      id: product.id || 'unknown-id',
      name: product.title || 'Unnamed Product',
      slug: product.handle || 'unnamed-product',
      description: product.description || '',
      currentPrice: (price / 100) || 0, // Convert from cents, default to 0
      originalPrice: (originalPrice / 100) || (price / 100) || 0, // Convert from cents, default to currentPrice or 0
      discount: calculateDiscount(originalPrice, price),
      image: imageUrl,
      inventory: variant.inventory_quantity || 0,
      sku: variant.sku || 'N/A',
    };
  } catch (error) {
    console.error('Error transforming product:', error, product);
    // Return a minimal product to avoid breaking the UI
    return {
      id: product?.id || 'error-product',
      name: product?.title || 'Error Product',
      slug: product?.handle || 'error-product',
      currentPrice: 0,
      originalPrice: 0,
      discount: 0,
      image: '/assets/placeholder.jpg',
      inventory: 0,
      sku: 'ERROR',
    };
  }
} 