//External Lib Import
import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  proprietorID: Schema.Types.ObjectId;
  storeID: Schema.Types.ObjectId;
  name: string;
  mobile: string;
  email: string;
  password: string;
  role: string;
}
