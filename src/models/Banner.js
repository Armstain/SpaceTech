import mongoose from 'mongoose';

const BannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this banner.'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  originalPrice: {
    type: Number,
    required: [true, 'Please provide an original price.'],
  },
  salePrice: {
    type: Number,
    required: [true, 'Please provide a sale price.'],
  },
  discount: {
    type: Number,
    default: 0,
  },
  image: {
    type: {
      url: {
        type: String,
        required: [true, 'Please provide an image URL for this banner.']
      },
      publicId: {
        type: String,
        required: [true, 'Please provide an image public ID for this banner.']
      }
    },
    required: [true, 'Please provide an image for this banner.'],
  },
  imageAlt: {
    type: String,
    required: [true, 'Please provide an image alt text.'],
  },
  expiryHours: {
    type: Number,
    default: 24,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
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

export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
