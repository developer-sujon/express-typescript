//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib Import
import { toJSON, paginate } from './plugins';
import { tokenValues } from '../config/token';
import { IToken } from '../interfaces';

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

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);
tokenSchema.plugin(paginate);

/**
 * @typedef Token
 */
const Token = model<IToken>('Token', tokenSchema);

export default Token;
