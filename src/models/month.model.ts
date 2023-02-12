//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib  import
import { toJSON, paginate } from './plugins';
import { IMonth } from '../interfaces';

const monthSchema: Schema = new Schema(
  {
    proprietorID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Proprietor',
    },
    storeID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Store',
    },
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
monthSchema.plugin(toJSON);
monthSchema.plugin(paginate);

/**
 * @typedef Month
 */

const Month = model<IMonth>('Month', monthSchema);
export default Month;
