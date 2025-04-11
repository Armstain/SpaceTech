import product1 from '@/public/assets/1.jpg'
import product2 from '@/public/assets/2.jpg'
import product3 from '@/public/assets/3.jpg'
import product4 from '@/public/assets/4.jpg'
import product5 from '@/public/assets/5.jpg'
import product6 from '@/public/assets/6.jpg'

export async function getProductBySlug(slug) {
  // In a real application, this would be an API call or database query
  const products = {
    "mixer-grinder": {
      name: "Mixer grinder",
      currentPrice: 2500.00,
      originalPrice: 3500.00,
      discount: 29,
      image: product1,
      inventory: 75,
      sku: "mixer-29"
    },
    "smart-watch": {
      name: "Smart watch",
      currentPrice: 965.00,
      originalPrice: 1520.00,
      discount: 33,
      image: product2,
      inventory: 85,
      sku: "watch-33"
    },
    "airbuds": {
      name: "Airbuds",
      currentPrice: 1000.00,
      originalPrice: 1650.00,
      discount: 22,
      image: product3,
      inventory: 90,
      sku: "airbuds-22"
    },
    "harddrive": {
      name: "Harddrive",
      currentPrice: 325.00,
      originalPrice: 325.00,
      discount: 0,
      image: product4,
      inventory: 100,
      sku: "harddrive-0"
    },
    "airbuds-2": {
      name: "Airbuds",
      currentPrice: 1000.00,
      originalPrice: 1650.00,
      discount: 22,
      image: product6,
      inventory: 100,
      sku: "airbuds-22"
    },
    "harddrive-2": {
      name: "Harddrive",
      currentPrice: 325.00,
      originalPrice: 325.00,
      discount: 25,
      image: product4,
      inventory: 100,
      sku: "harddrive-25"
    },
    
  };

  return products[slug] || products["smart-watch"];
} 
 