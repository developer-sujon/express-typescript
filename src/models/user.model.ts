//External Lib Import
import { Schema, model } from 'mongoose';

//Internal Lib  import
import { roles } from '../config/roles';
import { IUser } from '../interfaces/user.interface';
import { hashPassword } from '../utils/bcrypt';

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      max: 50,
      required: true,
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
          throw new Error('Password must be at least 8 digits long');
        }
      },
    },
    role: {
      type: String,
      enum: roles,
      default: 'owner',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await hashPassword(user.password);
  }
  next();
});

const User = model<IUser>('User', userSchema);

export default User;
