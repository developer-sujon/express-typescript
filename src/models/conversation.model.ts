//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib  import
import { IConversation } from '@/interfaces/conversation.interface';

const conversationSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    message: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Conversation = model<IConversation>('Conversation', conversationSchema);

export default Conversation;
