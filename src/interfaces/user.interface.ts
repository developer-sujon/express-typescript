//External Lib Import
import { Document } from 'mongoose';

export interface IUser extends Document {
  name: String;
  mobile: string;
  email: string;
  password: string;
  role: String;
}
