//External Lib Import
import { Document, Schema } from 'mongoose';

export interface IConversation extends Document {
  members: [Schema.Types.ObjectId];
  message: string;
}
