//External Lib Import
import { Response, NextFunction } from 'express';
import mongoose from 'mongoose';

//Internal Lib Import
import * as userService from '../services/user.service';
import * as authService from '../services/auth.service';
import catchAsync from '../helpers/catchAsync';

import OwnerModel from '../models/owner.model';
import { createToken } from '../utils/jwtToken';
import { sendMailUtility } from './../utils/sendMailUtility';
import { APPLICATION_NAME, FORGET_VERIFY_URI } from '../config/config';

/**
 * @desc Register User
 * @access public
 * @route /api/v1/auth/register
 * @methud POST
 */

export const register = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, fatherName, company, address, nid, mobile, ownerId } = req.body;

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();
    const user = await userService.userCreateService(req.body, session);

    const newOwner = new OwnerModel({
      userId: user._id,
      name,
      fatherName,
      company,
      address,
      nid,
      mobile,
      ownerId,
    });

    await newOwner.save({ session });

    await session.commitTransaction();
    await session.endSession();

    res.send({
      message: req.t('User Register Successfully'),
    });
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
};

/**
 * @desc Login User
 * @access public
 * @route /api/v1/auth/login
 * @methud POST
 */

export const login = catchAsync(async (req: any, res: Response) => {
  const { mobile, password } = req.body;

  const user = await authService.loginUserWithmobileAndPassword(
    mobile,
    password
  );

  const { _id, ownerId, ...others } = user[0];
  const token = await createToken({ _id, ownerId });

  res.send({
    message: req.t('User Login Successfull'),
    token: token,
  });
});

/**
 * @desc Fotget Password
 * @access public
 * @route /api/v1/auth/fotgetPassword/email
 * @methud GET
 */

export const fotgetPassword = catchAsync(async (req: any, res: Response) => {
  const { email } = req.params;

  const { token, userName } = await authService.generateResetPasswordToken(
    email
  );

  const emailSubject = `${APPLICATION_NAME} Email Verify Link`;
  const emailText = `Hello ${userName}, Please Click here<a href="${
    FORGET_VERIFY_URI + '/' + token
  }">Link</a>`;

  await sendMailUtility(email, emailSubject, emailText);

  res.send({
    message: req.t('Verification link has been sent to your email address.'),
  });
});

/**
 * @desc Verify Forget Token
 * @access public
 * @route /api/v1/auth/verifyForgetToken/email
 * @methud POST
 */

export const verifyForgetToken = catchAsync(async (req: any, res: Response) => {
  const { token, email } = req.params;
  await authService.verifyForgetTokenService(token, email);

  res.send({
    message: req.t('Email verify Successfully'),
    token: token,
  });
});

/**
 * @desc Reset Password Token
 * @access public
 * @route /api/v1/auth/resetPasswordToken/email
 * @methud POST
 */

export const resetPasswordToken = catchAsync(
  async (req: any, res: Response) => {
    const { token, email } = req.params;
    const { password } = req.body;
    await authService.resetPasswordTokenService(token, email, password);

    res.send({
      message: req.t('Password Reset Successfully'),
      token: token,
    });
  }
);
