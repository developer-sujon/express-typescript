//External Lib Import
import mongoose, { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: 'Owner',
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    subCategoryId: {
      type: mongoose.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },
    type: {
      type: String,
      enum: ['in', 'out'],
      default: 'in',
    },
    stock: {
      kg: {
        type: String,
        required: true,
      },
      bosta: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const Product = model('Product', productSchema);

export default Product;
