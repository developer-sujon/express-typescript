//External Lib Import
import Joi from 'joi';

//Internal Lib Import
import { password, mobile, objectId, email } from './custom.validation';

export const register = {
  body: Joi.object().keys({
    ownerId: Joi.string().custom(objectId),
    name: Joi.string().max(50).required(),
    mobile: Joi.string().custom(mobile).required(),
    email: Joi.string().custom(email).required(),
    password: Joi.string().required().custom(password),
    userId: Joi.string().custom(objectId),
    fatherName: Joi.string().required(),
    address: Joi.string().required(),
    nid: Joi.string().max(15).required(),
    company: Joi.string().max(50).required(),
  }),
};

export const login = {
  body: Joi.object().keys({
    mobile: Joi.string().custom(mobile).required(),
    password: Joi.string().required().custom(password),
  }),
};

export const fotgetPassword = {
  params: Joi.object().keys({
    email: Joi.string().custom(email).required(),
  }),
};

export const verifyForgetToken = {
  params: Joi.object().keys({
    email: Joi.string().custom(email).required(),
    token: Joi.string().required(),
  }),
};

export const resetPasswordToken = {
  params: Joi.object().keys({
    email: Joi.string().custom(email).required(),
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

export const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

export const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};
