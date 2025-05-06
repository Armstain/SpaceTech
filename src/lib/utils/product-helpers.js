/**
 * Normalizes product data for frontend display
 * This ensures all product objects have consistent fields regardless of source
 * 
 * @param {Object} product - Raw product data from API or database
 * @returns {Object} - Normalized product object with consistent fields
 */
export function normalizeProduct(product) {
  if (!product) return null;
  
  // Handle both MongoDB documents (with _id) and normalized products (with id)
  const id = product._id?.toString() || product.id;
  
  return {
    id,
    name: product.title || product.name,
    description: product.description || '',
    currentPrice: product.price || product.currentPrice || 0,
    originalPrice: product.originalPrice || product.price || 0,
    discount: product.discount || 0,
    images: product.images || [],
    image: product.image || (product.images && product.images.length > 0 ? product.images[0] : null),
    category: product.category || 'Uncategorized',
    status: product.status || 'published',
    slug: product.slug || id,
    inventory: 
      (product.variants && product.variants[0] && product.variants[0].inventory_quantity) || 
      product.inventory || 
      'In Stock',
    sku: (product.variants && product.variants[0]?.sku) || product.sku || 'N/A',
  };
}

/**
 * Normalizes an array of products
 * 
 * @param {Array} products - Array of raw product data
 * @returns {Array} - Array of normalized product objects
 */
export function normalizeProducts(products) {
  if (!Array.isArray(products)) return [];
  return products.map(normalizeProduct);
} 