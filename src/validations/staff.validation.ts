//External Lib Import
import Joi from 'joi';

//Internal Lib Import
import { password, objectId, mobile, email, nid } from './custom.validation';

export const staffCreate = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    mobile: Joi.string().required().custom(mobile),
    email: Joi.string().required().custom(email),
    address: Joi.string().min(3).max(100).required(),
    district: Joi.string().min(3).max(30).required(),
    thana: Joi.string().min(3).max(30).required(),
    password: Joi.string().required().custom(password),
    nid: Joi.string().required().custom(nid),
    photo: Joi.object(),
    status: Joi.boolean(),
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

export const staffDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

export const staffUpdate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    mobile: Joi.string().required().custom(mobile),
    email: Joi.string().required().custom(email),
    address: Joi.string().min(3).max(100).required(),
    district: Joi.string().min(3).max(30).required(),
    thana: Joi.string().min(3).max(30).required(),
    password: Joi.string().required().custom(password),
    nid: Joi.string().required().custom(nid),
    photo: Joi.object(),
    status: Joi.boolean(),
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

export const staffDelete = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};
