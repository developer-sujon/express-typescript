//External Lib Import
import jwt from 'jsonwebtoken';
import { JWT_EXPIRE, JWT_SECRET } from '../config/config';

export const createToken = async (payLoad: object) => {
  return await jwt.sign(payLoad, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  });
};

export const decodedToken = async (token: string) => {
  return await jwt.verify(token, JWT_SECRET);
};
