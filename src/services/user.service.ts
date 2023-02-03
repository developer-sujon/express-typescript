//External Lib Import
import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';

//Internal Lib Import
import User from '../models/user.model';
import CustomError from '../helpers/CustomError';
import { IUser } from '../interfaces/user.interface';

/**
 * Create a user
 */
export const createUser = async (
  userBody: any,
  session: any
): Promise<IUser> => {
  userBody.password = 'pass1234';

  if (await User.isEmailTaken(userBody.email)) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (await User.isMobileTaken(userBody.mobile)) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Mobile already taken');
  }

  if (session) {
    return new User(userBody).save({ session });
  } else {
    return User.create(userBody);
  }
};

/**
 * Get user by id
 */
export const getUserById = async (id: ObjectId) => {
  return User.findById(id);
};

/**
 * Get user by email
 */
export const getUserByEmail = async (email: string) => {
  return User.findOne({ email });
};

/**
 * Get user by mobile
 */
export const getUserByMobile = async (mobile: string) => {
  return User.findOne({ mobile });
};

/**
 * Get user by property
 */
export const userDetailsByPropertyService = async (property: any) => {
  return User.findOne({ property });
};

/**
 * Update user by id
 */
export const updateUserById = async (
  userId: ObjectId,
  updateBody: any
): Promise<IUser> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new CustomError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};
