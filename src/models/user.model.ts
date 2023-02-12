//External Lib Import
import { Schema, Model, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

//Internal Lib  import
import { toJSON, paginate } from './plugins';
import { roles } from '../config/roles';
import { IUser } from '../interfaces';

export interface IUserDocument extends IUser {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
  isEmailTaken(password: string, excludeUserId?: ObjectId): Promise<boolean>;
  isMobileTaken(mobile: string, excludeUserId?: ObjectId): Promise<boolean>;
}

const userSchema: Schema = new Schema(
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
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            'Password must contain at least one letter and one number'
          );
        }
      },
      private: true,
    },
    role: {
      type: String,
      enum: roles,
      required: true,
      default: 'proprietor',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/**
 * Check if email is taken
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if mobile is taken
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 */
userSchema.statics.isMobileTaken = async function (
  mobile: string,
  excludeUserId?: ObjectId
) {
  const user = await this.findOne({ mobile, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 */
userSchema.methods.isPasswordMatch = async function (
  password: string
): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * @typedef User
 */

const User: IUserModel = model<IUserDocument, IUserModel>('User', userSchema);
export default User;
