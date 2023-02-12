//External Lib Import
import { Document, Schema } from 'mongoose';

// to make the file a module and avoid the TypeScript error
export {};

declare global {
  namespace Express {
    export interface Request {
      proprietorID: Schema.Types.ObjectId | any;
      storeID: Schema.Types.ObjectId | any;
      userID: Schema.Types.ObjectId | any;
    }
  }
}
