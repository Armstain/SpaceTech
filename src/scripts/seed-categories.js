// Script to seed initial categories
// Run with: node src/scripts/seed-categories.js

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

const categories = [
  {
    name: 'Electronics',
    description: 'Gadgets, devices, and electronic equipment',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Clothing',
    description: 'Apparel, fashion items, and accessories',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Home & Kitchen',
    description: 'Products for home decor and kitchen appliances',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Sports & Fitness',
    description: 'Equipment and accessories for sports and fitness activities',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Books',
    description: 'Physical and digital books across genres',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Toys & Games',
    description: 'Products for entertainment and play',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  },
  {
    name: 'Beauty & Personal Care',
    description: 'Cosmetics, skincare, and personal hygiene products',
    is_active: true,
    created_at: new Date(),
    updated_at: new Date()
  }
];

async function seedCategories() {
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
    const collection = db.collection('categories');
    
    // Check if categories already exist
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`${existingCount} categories already exist in the database`);
      const shouldContinue = process.argv.includes('--force');
      if (!shouldContinue) {
        console.log('Use --force flag to add categories anyway');
        await client.close();
        process.exit(0);
      }
    }
    
    // Insert categories
    const result = await collection.insertMany(categories);
    console.log(`${result.insertedCount} categories successfully inserted`);
    
    // Close connection
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error seeding categories:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedCategories(); 