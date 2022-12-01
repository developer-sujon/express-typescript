//External Lib Import
import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';

//Internal Lib Import
import * as userService from '../services/user.service';
import { decodedToken } from '../utils/jwtToken';
import CustomError from '../helpers/CustomError';
import mongoose from 'mongoose';

const auth =
  (roles: string[]) => async (req: any, res: Response, next: NextFunction) => {
    try {
      const { authorization }: any = req.headers;
      const token = authorization.split(' ')[1];

      if (!token) {
        return next(
          new CustomError(
            httpStatus.UNAUTHORIZED,
            'Please login to access this resource.'
          )
        );
      }

      const decoded: any = await decodedToken(token);

      if (!decoded) {
        return next(new CustomError(httpStatus.UNAUTHORIZED, 'Invalid token.'));
      }
      const user = await userService.userDetailsByPropertyService({
        _id: new mongoose.Types.ObjectId(decoded._id),
      });

      if (roles.indexOf(user[0].role) === -1) {
        return next(
          new CustomError(httpStatus.UNAUTHORIZED, 'Not authorized.')
        );
      }
      req.id = decoded._id;
      next();
    } catch (err) {
      return next(new CustomError(httpStatus.UNAUTHORIZED, 'Invalid token.'));
    }
  };

export default auth;
