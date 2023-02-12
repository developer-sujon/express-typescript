//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib  import
import { toJSON, paginate } from './plugins';
import { permissions } from '../config/permissions';
import { IRole } from '../interfaces';

const roleSchema: Schema = new Schema(
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
    permissions: {
      type: Object,
      required: true,
      default: permissions,
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
roleSchema.plugin(toJSON);
roleSchema.plugin(paginate);

/**
 * @typedef role
 */

const Role = model<IRole>('role', roleSchema);
export default Role;
