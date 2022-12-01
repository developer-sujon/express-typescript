//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib Import
import { tokenValues } from '../config/token';
import { IToken } from '../interfaces/token.interface';

const tokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      validate(value: string) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          throw new Error('Please enter the correct email');
        }
      },
    },
    type: {
      type: String,
      enum: tokenValues,
      required: true,
    },
    expires: {
      type: Number,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Token = model<any>('Token', tokenSchema);

export default Token;
