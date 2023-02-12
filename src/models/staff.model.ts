//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib  import
import { toJSON, paginate } from './plugins';
import { permissions } from '../config/permissions';
import { IStaff } from '../interfaces';

const staffSchema: Schema = new Schema(
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
    userID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      trim: true,
    },
    nid: {
      type: String,
      min: 3,
      max: 20,
    },
    address: {
      type: String,
      required: true,
      min: 3,
      max: 100,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      trim: true,
    },
    thana: {
      type: String,
      required: true,
      min: 3,
      max: 30,
      trim: true,
    },
    photo: {
      type: Object,
      default: null,
    },
    permissions: {
      type: Object,
      required: true,
      default: permissions,
    },
    reference: {
      name: {
        type: String,
        min: 3,
        max: 30,
        trim: true,
      },
      mobile: {
        type: String,
        validate(value: string) {
          if (!value.match('^(?:\\+88|88)?(01[3-9]\\d{8})$')) {
            throw new Error('Please enter the correct number');
          }
        },
      },
      address: {
        type: String,
        min: 3,
        max: 100,
        trim: true,
      },
      district: {
        type: String,
        min: 3,
        max: 30,
        trim: true,
      },
      thana: {
        type: String,
        min: 3,
        max: 30,
        trim: true,
      },
      relation: {
        type: String,
        min: 3,
        max: 30,
        trim: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'banned', 'deleted'],
      default: 'active',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
staffSchema.plugin(toJSON);
staffSchema.plugin(paginate);

/**
 * @typedef Staff
 */

const Staff = model<IStaff>('Staff', staffSchema);
export default Staff;
