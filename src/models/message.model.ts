//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib  import
import { IMessage } from '@/interfaces/message.interface';

const messageSchema = new Schema(
  {
    conversationID: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    senderID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      text: {
        type: String,
        default: '',
      },
      image: {
        type: String,
        default: '',
      },
    },
    type: {
      type: String,
      enum: ['seen', 'unseen'],
      default: 'unseen',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Message = model<IMessage>('Message', messageSchema);

export default Message;
