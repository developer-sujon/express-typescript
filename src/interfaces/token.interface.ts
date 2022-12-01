//External Lib Import
import { Document, Schema } from 'mongoose';

export interface IToken extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
  email: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
