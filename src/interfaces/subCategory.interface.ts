//External Lib Import
import { Document, Schema } from 'mongoose';

export interface ISubCategory extends Document {
  ownerId: Schema.Types.ObjectId;
  categoryId: Schema.Types.ObjectId;
  name: String;
}
