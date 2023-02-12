//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib  import
import { toJSON, paginate } from './plugins';
import { IProprietor } from '../interfaces';
import { permissions } from '../config/permissions';

const proprietorSchema: Schema = new Schema(
  {
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
    proprietorSettings: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'inactive', 'banned', 'deleted'],
      default: 'active',
    },
    avatar: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
proprietorSchema.plugin(toJSON);
proprietorSchema.plugin(paginate);

/**
 * @typedef Proprietor
 */

const Proprietor = model<IProprietor>('Proprietor', proprietorSchema);
export default Proprietor;
