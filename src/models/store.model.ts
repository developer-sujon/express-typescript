//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib  import
import { toJSON, paginate } from './plugins';
import { IStore } from '../interfaces';

const storeSchema: Schema = new Schema(
  {
    proprietorID: {
      type: Schema.Types.ObjectId,
      ref: 'Proprietor',
      required: true,
    },
    storeName: {
      type: String,
      required: true,
      min: 3,
      max: 100,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      validate(value: string) {
        if (!value.match('^(?:\\+88|88)?(01[3-9]\\d{8})$')) {
          throw new Error('Please enter the correct number');
        }
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value: string) {
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          throw new Error('Please enter the correct email');
        }
      },
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
    storeSettings: {
      type: Object,
      default: {},
    },
    storePhoto: {
      type: Object,
      default: null,
    },
    storeStatus: {
      type: String,
      required: true,
      enum: ['new', 'active', 'inactive', 'banned', 'deleted'],
      default: 'new',
    },
    storePaymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// add plugin that converts mongoose to json
storeSchema.plugin(toJSON);
storeSchema.plugin(paginate);

/**
 * @typedef Store
 */

const Store = model<IStore>('Store', storeSchema);
export default Store;
