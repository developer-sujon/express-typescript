//External Lib Import
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import httpStatus from 'http-status';

//Internal Lib Import
import catchAsync from '../helpers/catchAsync';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import * as tokenService from '../services/token.service';
import * as emailService from '../services/email.service';
import * as commonService from '../services/common.service';

// const { Proprietor, Store } = require('../models');

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    // const proprietorCreate = await commonService.createService(
    //   Proprietor,
    //   false,
    //   {},
    //   null,
    //   req.body,
    //   session
    // );
    // const storeCreate = await commonService.createService(
    //   Store,
    //   false,
    //   {},
    //   null,
    //   {
    //     ...req.body,
    //     proprietorID: proprietorCreate._id,
    //   },
    //   session
    // );

    await userService.createUser(
      {
        // proprietorID: proprietorCreate._id,
        // storeID: storeCreate._id,
        ...req.body,
      },
      session
    );

    await session.commitTransaction();
    session.endSession();

    res
      .status(httpStatus.CREATED)
      .send({ message: req.t('Registration Successful') });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const login = catchAsync(async (req: Request, res: Response) => {
  const { mobile, password } = req.body;
  const user = await authService.loginUserWithMobileAndPassword(
    mobile,
    password
  );
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ tokens });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
  const tokens = await authService.refreshAuth(req.params.refreshToken);
  res.send({ ...tokens });
});

export const forgotPassword = catchAsync(
  async (req: Request, res: Response) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(
      req.body.email
    );
    await emailService.sendResetPasswordEmail(
      req.body.email,
      resetPasswordToken
    );
    res.status(httpStatus.NO_CONTENT).send();
  }
);

export const resetPassword = catchAsync(async (req: any, res: Response) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

export const sendVerificationEmail = catchAsync(
  async (req: any, res: Response) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(
      req.user.userID
    );
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
  }
);

export const verifyEmail = catchAsync(async (req: any, res: Response) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});
