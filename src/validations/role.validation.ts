//External Lib Import
import Joi from 'joi';
import { objectId } from './custom.validation';

export const roleCreate = {
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    status: Joi.boolean(),
  }),
};

export const roleDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

export const roleUpdate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    status: Joi.boolean(),
  }),
};

export const roleDelete = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};
