//External Lib Import
import { Document, Schema } from 'mongoose';

export default interface IMonth extends Document {
  proprietorID: Schema.Types.ObjectId;
  storeID: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
  name: string;
  isActive: boolean;
  status: boolean;
}
