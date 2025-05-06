// Script to seed initial products
// Run with: node src/scripts/seed-products.js

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const products = [
  {
    title: 'Premium Noise-Canceling Headphones',
    description: 'Experience premium sound quality with our wireless noise-canceling headphones. With 30-hour battery life and comfortable ear cups, they\'re perfect for travel, work, or relaxation.',
    price: 249.99,
    images: [
      'https://images.unsplash.com/photo-1578319439584-104c94d37305?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1551970634-747846a548cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=742&q=80'
    ],
    category: 'Electronics',
    variants: [
      {
        title: 'Black',
        sku: 'HEADPHONE-BLK',
        options: { color: 'Black' },
        price: 249.99,
        inventory_quantity: 50
      },
      {
        title: 'White',
        sku: 'HEADPHONE-WHT',
        options: { color: 'White' },
        price: 249.99,
        inventory_quantity: 30
      }
    ],
    options: [
      {
        title: 'Color',
        values: ['Black', 'White']
      }
    ],
    status: 'published',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    title: 'Ergonomic Office Chair',
    description: 'Improve your work-from-home setup with our ergonomic office chair. Features adjustable height, lumbar support, and breathable mesh back for all-day comfort.',
    price: 199.99,
    images: [
      'https://images.unsplash.com/photo-1595971294624-80bcf0d7eb24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
    ],
    category: 'Home & Kitchen',
    variants: [
      {
        title: 'Black',
        sku: 'CHAIR-BLK',
        options: { color: 'Black' },
        price: 199.99,
        inventory_quantity: 25
      }
    ],
    options: [
      {
        title: 'Color',
        values: ['Black']
      }
    ],
    status: 'published',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    title: 'Smart Fitness Watch',
    description: 'Track your workouts, heart rate, sleep, and more with our waterproof smart fitness watch. Compatible with iOS and Android devices.',
    price: 129.99,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80'
    ],
    category: 'Sports & Fitness',
    variants: [
      {
        title: 'Black',
        sku: 'WATCH-BLK',
        options: { color: 'Black' },
        price: 129.99,
        inventory_quantity: 75
      },
      {
        title: 'Blue',
        sku: 'WATCH-BLU',
        options: { color: 'Blue' },
        price: 129.99,
        inventory_quantity: 45
      }
    ],
    options: [
      {
        title: 'Color',
        values: ['Black', 'Blue']
      }
    ],
    status: 'published',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    title: 'Organic Cotton T-Shirt',
    description: 'Made from 100% organic cotton, this comfortable t-shirt is eco-friendly and perfect for everyday wear.',
    price: 24.99,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80'
    ],
    category: 'Clothing',
    variants: [
      {
        title: 'Small / White',
        sku: 'TSHIRT-S-WHT',
        options: { size: 'S', color: 'White' },
        price: 24.99,
        inventory_quantity: 30
      },
      {
        title: 'Medium / White',
        sku: 'TSHIRT-M-WHT',
        options: { size: 'M', color: 'White' },
        price: 24.99,
        inventory_quantity: 40
      },
      {
        title: 'Large / White',
        sku: 'TSHIRT-L-WHT',
        options: { size: 'L', color: 'White' },
        price: 24.99,
        inventory_quantity: 35
      }
    ],
    options: [
      {
        title: 'Size',
        values: ['S', 'M', 'L']
      },
      {
        title: 'Color',
        values: ['White']
      }
    ],
    status: 'published',
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    title: 'Professional Chef Knife Set',
    description: 'This 5-piece knife set includes everything a home chef needs. Made from high-quality stainless steel with ergonomic handles.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    category: 'Home & Kitchen',
    status: 'published',
    created_at: new Date(),
    updated_at: new Date()
  }
];

async function seedProducts() {
  // Check for MongoDB URI
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable in .env.local');
    process.exit(1);
  }

  try {
    // Connect to MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const collection = db.collection('products');
    
    // Check if products already exist
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`${existingCount} products already exist in the database`);
      const shouldContinue = process.argv.includes('--force');
      if (!shouldContinue) {
        console.log('Use --force flag to add products anyway');
        await client.close();
        process.exit(0);
      }
    }
    
    // Insert products
    const result = await collection.insertMany(products);
    console.log(`${result.insertedCount} products successfully inserted`);
    
    // Close connection
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedProducts(); 