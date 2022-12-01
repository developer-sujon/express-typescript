//External Lib Import
import Joi from 'joi';
import { objectId } from './custom.validation';

export const subCategoryCreate = {
  body: Joi.object().keys({
    name: Joi.string().max(50).required(),
    categoryId: Joi.string().custom(objectId).required(),
  }),
};

export const subCategoryDetails = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};

export const subCategoryPaginate = {
  params: Joi.object().keys({
    pageNumber: Joi.number().min(1).required(),
    perPage: Joi.number().required(),
    searchKeyword: Joi.string().required(),
  }),
};

export const subCategoryUpdate = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().max(50),
    categoryId: Joi.string().custom(objectId),
  }),
};

export const subCategoryDelete = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required(),
  }),
};
