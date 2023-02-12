//External Lib  import
import httpStatus from 'http-status';
import { Request } from 'express';

//Internal Lib  import
import * as userService from './user.service';
import * as tokenService from './token.service';
import { IUser } from '../interfaces';
import CustomError from '../helpers/CustomError';
import Token from '../models/token.model';
import { tokenTypes } from '../config/token';
import { User, Proprietor, Store } from '../models';

/**
 * Register User
 */
export const registerUser = async (
  request: Request,
  session: any
): Promise<IUser> => {
  const password = 'pass1234';

  if (await User.isEmailTaken(request.body.email)) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (await User.isMobileTaken(request.body.mobile)) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Mobile already taken');
  }

  const proprietor = await new Proprietor(request.body).save({ session });
  const store = await new Store({
    proprietorID: proprietor._id,
    ...request.body,
  }).save({ session });

  return await new User(
    {
      proprietorID: proprietor._id,
      storeID: store._id,
      password,
      ...request.body,
    },
    { session }
  ).save();
};

/**
 * Login with email and password
 */
export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new CustomError(
      httpStatus.UNAUTHORIZED,
      'Incorrect email or password'
    );
  }
  return user;
};

/**
 * Login with mobile and password
 */
export const loginUserWithMobileAndPassword = async (
  mobile: string,
  password: string
): Promise<IUser> => {
  const user = await userService.getUserByMobile(mobile);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new CustomError(
      httpStatus.UNAUTHORIZED,
      'Incorrect mobile or password'
    );
  }
  return user;
};

/**
 * Logout
 */
export const logout = async (refreshToken: string) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 */
export const refreshAuth = async (refreshToken: string): Promise<object> => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );

    const user = await userService.userDetailsByPropertyService(
      refreshTokenDoc.userID
    );

    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new CustomError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

/**
 * Reset password
 */
export const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string
) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc._id);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new CustomError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 */
export const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc._id);
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(user.id, { isEmailVerified: true });
  } catch (error) {
    throw new CustomError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};
