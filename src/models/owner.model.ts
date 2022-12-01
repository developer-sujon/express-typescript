//External Lib Import
import { IOwner } from '@/interfaces/owner.interface';
import mongoose, { Schema, model } from 'mongoose';

const ownerSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      max: 50,
    },
    fatherName: {
      type: String,
      required: true,
      max: 50,
    },
    company: {
      type: String,
      required: true,
      max: 50,
    },
    address: {
      type: String,
      required: true,
      max: 150,
    },
    nid: {
      type: String,
      required: true,
      max: 15,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Owner = model<IOwner>('Owner', ownerSchema);

export default Owner;
