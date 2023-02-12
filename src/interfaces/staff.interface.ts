//External Lib Import
import { Document, Schema } from 'mongoose';

//Internal Lib Import
import { Reference } from './proprietor.interface';

export default interface IStaff extends Document {
  proprietorID: Schema.Types.ObjectId;
  storeID: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
  name: string;
  nid: number;
  address: string;
  district: string;
  thana: string;
  photo: object;
  permissions: object;
  reference: Reference;
  status: boolean;
}
