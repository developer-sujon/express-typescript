//External Lib Import
import jwt from 'jsonwebtoken';
import moment from 'moment';
import httpStatus from 'http-status';
import { ObjectId } from 'mongodb';

//Internal Lib Import
import * as config from '../config/config';
import * as userService from './user.service';
import ApiError from '../helpers/CustomError';
import { tokenTypes } from '../config/token';
import { IToken } from '../interfaces/token.interface';
import { IUser } from './../interfaces/user.interface';
import Token from '../models/token.model';

/**
 * Generate token
 */
export const generateToken = (
  userID: ObjectId,
  expires: any,
  type: string,
  secret = config.JWT_SECRET
): string => {
  const payload = {
    sub: userID,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 */
export const saveToken = async (
  token: string,
  userID: ObjectId,
  expires: any,
  type: string,
  blacklisted = false
): Promise<IToken> => {
  const tokenDoc = await Token.create({
    token,
    userID,
    expires: expires.toDate(),
    type,
    blacklisted,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 */
export const verifyToken = async (
  token: string,
  type: string
): Promise<IToken> => {
  const payload = jwt.verify(token, config.JWT_SECRET);

  const tokenDoc = await Token.findOne({
    token,
    type,
    userID: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 */
export const generateAuthTokens = async (user: IUser): Promise<object> => {
  const accessTokenExpires = moment().add(
    config.JWT_ACCESS_EXPIRATION_MINUTES,
    'minutes'
  );
  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.JWT_REFRESH_EXPIRATION_DAYS,
    'days'
  );
  const refreshToken = generateToken(
    user._id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user._id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 */
export const generateResetPasswordToken = async (
  email: string
): Promise<string> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No users found with this email');
  }
  const expires = moment().add(
    config.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    'minutes'
  );
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD
  );
  return resetPasswordToken;
};

/**
 * Generate verify email token
 */
export const generateVerifyEmailToken = async (user: any): Promise<string> => {
  const expires = moment().add(
    config.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    'minutes'
  );
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    tokenTypes.VERIFY_EMAIL
  );
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
  return verifyEmailToken;
};
