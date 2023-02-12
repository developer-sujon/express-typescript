//External Lib Import
import Joi from 'joi';

//Internal Lib Import
import { password, mobile, objectId, email } from './custom.validation';

export const register = {
  body: Joi.object().keys({
    storeName: Joi.string().min(3).max(50).required(),
    name: Joi.string().min(3).max(30).required(),
    mobile: Joi.string().required().custom(mobile),
    email: Joi.string().required().custom(email),
    address: Joi.string().min(3).max(100).required(),
    district: Joi.string().min(3).max(30).required(),
    thana: Joi.string().min(3).max(30).required(),
    password: Joi.string().required().custom(password),
    reference: Joi.object()
      .keys({
        name: Joi.string().min(3).max(30),
        mobile: Joi.string().custom(mobile),
        relation: Joi.string().min(3).max(30),
        address: Joi.string().min(3).max(100),
        district: Joi.string().min(3).max(30),
        thana: Joi.string().min(3).max(30),
      })
      .required(),
  }),
};

export const login = {
  body: Joi.object().keys({
    mobile: Joi.string().required().custom(mobile),
    password: Joi.string().required().custom(password),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const refreshTokens = {
  params: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

export const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

export const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};
