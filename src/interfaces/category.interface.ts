//External Lib Import
import { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  ownerId: Schema.Types.ObjectId;
  name: String;
  type: string;
  subCategory: [];
}
