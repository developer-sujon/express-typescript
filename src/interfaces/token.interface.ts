//External Lib Import
import { Document, Schema } from 'mongoose';

export default interface IToken extends Document {
  userID: Schema.Types.ObjectId;
  token: string;
  type: string;
  expires: Date;
  blacklisted: boolean;
}
