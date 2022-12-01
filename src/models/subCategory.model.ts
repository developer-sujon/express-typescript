//External Lib Import
import mongoose, { Schema, model } from 'mongoose';

//Internal Lib  import
import { ISubCategory } from '@/interfaces/subCategory.interface';

const subcategorySchema = new Schema(
  {
    ownerId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Owner',
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SubCategory = model<ISubCategory>('SubCategory', subcategorySchema);

export default SubCategory;
