import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this category.'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
    unique: true
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
  is_active: {
    type: Boolean,
    default: true
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

export default mongoose.models.Category || mongoose.model('Category', CategorySchema); 