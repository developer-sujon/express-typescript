//External Lib Import
import Joi from 'joi';
import { objectId } from './custom.validation';

export const categoryCreate = {
  body: Joi.object().keys({
    name: Joi.string().max(50).required(),
    type: Joi.string().valid('in', 'out'),
  }),
};

export const categoryDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

export const categoryPaginate = {
  params: Joi.object().keys({
    pageNumber: Joi.number().min(1).required(),
    perPage: Joi.number().required(),
    searchKeyword: Joi.string().required(),
  }),
};

export const categoryUpdate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().max(50),
    type: Joi.string().valid('in', 'out'),
  }),
};

export const categoryDelete = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};
