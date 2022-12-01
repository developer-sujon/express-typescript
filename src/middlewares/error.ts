/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import CustomError from '../helpers/CustomError';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { IS_PRODUCTION, IS_TEST } from '../config/config';
import logger from '../config/logger';
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';

export const errorConverter = (err: any, req: any, res: any, next: any) => {
  let error = err;
  if (!(error instanceof CustomError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new CustomError(statusCode, message as string, true, err.stack);
  }
  next(error);
};

export const errorHandler = (err: any, req: any, res: any, next: any) => {
  let { statusCode, message } = err;
  if (IS_PRODUCTION && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  message = req.t(capitalizeFirstLetter(message));

  const response = {
    code: statusCode,
    message,
    ...(!IS_PRODUCTION && { stack: err.stack }),
  };

  if (!IS_PRODUCTION && !IS_TEST) {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};
