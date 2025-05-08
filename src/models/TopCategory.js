import mongoose from 'mongoose';

const TopCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this category.'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this category.'],
  },
  imageSrc: {
    type: String,
    required: [true, 'Please provide an image for this category.'],
  },
  backgroundColor: {
    type: String,
    default: 'bg-base-300',
  },
  isMainCategory: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
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

export default mongoose.models.TopCategory || mongoose.model('TopCategory', TopCategorySchema);
