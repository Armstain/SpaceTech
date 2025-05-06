import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this product.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this product.'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this product.'],
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category for this product.'],
  },
  variants: {
    type: [{
      title: String,
      sku: String,
      options: {
        type: Map,
        of: String
      },
      price: Number,
      inventory_quantity: {
        type: Number,
        default: 0
      }
    }],
    default: []
  },
  options: {
    type: [{
      title: String,
      values: [String]
    }],
    default: []
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema); 