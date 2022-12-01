//External Lib Import
import { Document, Schema } from 'mongoose';

export interface IOwner extends Document {
  userId: Schema.Types.ObjectId;
  name: String;
  fatherName: string;
  company: string;
  address: String;
  nid: String;
  mobile: String;
}
