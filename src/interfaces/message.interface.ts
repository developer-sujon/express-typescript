//External Lib Import
import { Document, Schema } from 'mongoose';

interface message {
  text?: string;
  image?: string;
}

export interface IMessage extends Document {
  senderID: Schema.Types.ObjectId;
  reseverID: Schema.Types.ObjectId;
  message: message;
  type: string;
}
