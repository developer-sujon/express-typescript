//External Lib Import
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import passport from 'passport';

//Internal Lib Import
import CustomError from '../helpers/CustomError';
import { IUser } from './../interfaces';

const verifyCallback =
  (req: Request, resolve: any, reject: any) =>
  async (err: string, user: IUser, info: string) => {
    if (err || info || !user) {
      return reject(
        new CustomError(httpStatus.UNAUTHORIZED, 'Please authenticate')
      );
    }

    req.proprietorID = user.proprietorID;
    req.storeID = user.storeID;
    req.userID = user._id;
    resolve();
  };

export const auth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        'jwt',
        { session: false },
        verifyCallback(req, resolve, reject)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

export const roles =
  (roles: [string]) => async (req: any, res: Response, next: NextFunction) => {
    try {
      if (roles.indexOf(req.user.role) === -1) {
        throw new CustomError(httpStatus.UNAUTHORIZED, `Forbidden`);
      }
      return next();
    } catch (error) {
      next(error);
    }
  };

export const accessPermission =
  (routePermission: string) =>
  async (req: any, res: Response, next: NextFunction) => {
    try {
      if (req.user.role !== 'proprietor') {
        // let permissions = await Staff.findOne({ userID: req.user._id }).select(
        //   'permissions'
        // );
        // if (permissions.permissions[routePermission]) {
        //   return next();
        // }
        // throw new CustomError(
        //   httpStatus.UNAUTHORIZED,
        //   `You don't have permission to this route`
        // );
      }
      return next();
    } catch (error) {
      next(error);
    }
  };
