//External Lib Import
import { Document, Schema } from 'mongoose';

export interface IToken extends Document {
  userID: Schema.Types.ObjectId;
  token: string;
  email: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
