//External Lib  import
import httpStatus from 'http-status';

//Internal Lib  import
import * as userService from './user.service';
import CustomError from '../helpers/CustomError';
import { createToken } from '../utils/jwtToken';
import { JWT_RESET_PASSWORD_EXPIRE_MINUTUS } from '../config/config';
import { hashPassword, verifyPassword } from '../utils/bcrypt';
import { tokenTypes } from '../config/token';
import { addMinutes } from '../helpers/addMinit';
import TokenModel from '../models/token.model';
import UserModel from '../models/user.model';

export const loginUserWithmobileAndPassword = async (
  mobile: string,
  password: string
): Promise<any> => {
  const user = await userService.userDetailsByPropertyService({
    mobile,
  });

  if (!user.length) {
    throw new CustomError(httpStatus.NOT_FOUND, 'Mobile number not found');
  }

  if (!(await verifyPassword(password, user?.[0]?.password))) {
    throw new CustomError(httpStatus.UNAUTHORIZED, 'The password is incorrect');
  }
  return user;
};

export const generateResetPasswordToken = async (
  email: string
): Promise<any> => {
  const user = await userService.userDetailsByPropertyService({ email });
  if (!user.length) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      'No users found with this email'
    );
  }

  const expires = addMinutes(JWT_RESET_PASSWORD_EXPIRE_MINUTUS);
  const resetPasswordToken = await createToken({ email });

  const newToken = new TokenModel({
    userId: user[0]._id,
    email: user[0].email,
    token: resetPasswordToken,
    type: tokenTypes.RESET_PASSWORD,
    expires,
  });

  await newToken.save();

  return {
    token: resetPasswordToken,
    userName: user[0].name,
  };
};

export const verifyForgetTokenService = async (
  token: string,
  email: string
): Promise<any> => {
  const user = await userService.userDetailsByPropertyService({ email });
  if (!user.length) {
    throw new CustomError(
      httpStatus.NOT_FOUND,
      'No users found with this email'
    );
  }

  const validToken = await TokenModel.aggregate([
    {
      $match: {
        token,
        email,
      },
    },
  ]);

  if (!validToken.length) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Verify Token Not Valid');
  }

  const useToken = await TokenModel.aggregate([
    {
      $match: {
        blacklisted: true,
      },
    },
  ]);

  if (useToken.length) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Verify Token already Use');
  }

  const expireToken = await TokenModel.aggregate([
    {
      $match: {
        expires: { $lte: new Date().getTime() },
      },
    },
  ]);

  if (expireToken.length) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Verify Token expire');
  }

  return await TokenModel.updateOne(
    { _id: validToken[0]._id },
    { blacklisted: true }
  );
};

export const resetPasswordTokenService = async (
  token: string,
  email: string,
  password: string
): Promise<any> => {
  const validToken = await TokenModel.aggregate([
    {
      $match: {
        token,
        email,
        blacklisted: true,
      },
    },
  ]);

  if (!validToken.length) {
    throw new CustomError(httpStatus.BAD_REQUEST, 'Verify Token Not Valid');
  }

  password = await hashPassword(password);

  return await UserModel.updateOne({ email }, { password });
};
