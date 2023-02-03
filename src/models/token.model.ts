//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib Import
import { tokenValues } from '../config/token';
import { IToken } from '../interfaces/token.interface';

const tokenSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    token: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: tokenValues,
      required: true,
    },
    expires: {
      type: Date,
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

const Token = model<IToken>('Token', tokenSchema);

export default Token;
