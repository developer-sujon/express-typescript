//External Lib Import
import Joi from 'joi';
import { objectId } from './custom.validation';

export const conversationCreate = {
  body: Joi.object().keys({
    senderID: Joi.string().custom(objectId).required(),
    receiverID: Joi.string().custom(objectId).required(),
    message: Joi.string(),
  }),
};

export const conversationList = {
  params: Joi.object().keys({
    senderID: Joi.string().custom(objectId).required(),
    receiverID: Joi.string().custom(objectId).required(),
  }),
};
