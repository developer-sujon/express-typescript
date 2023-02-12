//External Lib Import
import { Document, Schema } from 'mongoose';

export default interface IStore extends Document {
  proprietorID: Schema.Types.ObjectId;
  storeName: string;
  mobile: string;
  email: string;
  address: string;
  district: string;
  thana: string;
  storeSettings: object;
  storePhoto: object;
  storeStatus: string;
  storePaymentStatus: string;
}
