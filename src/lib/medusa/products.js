import { medusaClient, handleError } from './config';

/**
 * Fetch all products from Medusa
 * @param {Object} options - Query options
 * @returns {Promise<Object>} - Products data
 */
export async function getProducts(options = {}) {
  try {
    const { 
      limit = 12, 
      offset = 0,
      cart_id,
      region_id,
      currency_code,
      ...restOptions
    } = options;

    const { products, count } = await medusaClient.products.list({
      limit,
      offset,
      cart_id,
      region_id,
      currency_code,
      ...restOptions
    });
    
    return { products, count };
  } catch (error) {
    return handleError(error);
  }
}

/**
 * Fetch a single product by handle (slug)
 * @param {string} handle - Product handle/slug
 * @returns {Promise<Object>} - Product data
 */
export async function getProductByHandle(handle) {
  try {
    const { products } = await medusaClient.products.list({ handle });
    return products[0] || null;
  } catch (error) {
    return handleError(error);
  }
}

/**
 * Fetch a single product by ID
 * @param {string} id - Product ID
 * @returns {Promise<Object>} - Product data
 */
export async function getProductById(id) {
  try {
    const product = await medusaClient.products.retrieve(id);
    return product;
  } catch (error) {
    return handleError(error);
  }
} 