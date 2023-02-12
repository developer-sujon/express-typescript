//External Lib Import
import { Document } from 'mongoose';

export interface Reference {
  name: string;
  mobile: string;
  address: string;
  district: string;
  thana: string;
  relation: string;
}

export default interface IProprietor extends Document {
  name: string;
  nid: string;
  address: string;
  district: string;
  thana: string;
  permissions: object;
  storeSettings: object;
  reference: Reference;
  proprietorSettings: string;
  status: string;
  avatar: string;
}
