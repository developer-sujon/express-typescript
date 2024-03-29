//External Lib Import
import { Document, Schema } from 'mongoose';

export default interface IUser extends Document {
  proprietorID: Schema.Types.ObjectId;
  storeID: Schema.Types.ObjectId;
  mobile: string;
  email: string;
  password: string;
  role: string;
}
