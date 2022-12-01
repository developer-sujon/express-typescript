//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib  import
import { ICategory } from '@/interfaces/category.interface';

const categorySchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'Owner',
      required: true,
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
    type: {
      type: String,
      enum: ['in', 'out'],
      default: 'in',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const category = model<ICategory>('Category', categorySchema);

export default category;
