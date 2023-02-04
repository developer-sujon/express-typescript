//External Lib Import
import Joi from 'joi';
import { objectId } from './custom.validation';

export const messageCreate = {
  body: Joi.object().keys({
    conversationID: Joi.string().custom(objectId).required(),
    senderID: Joi.string().custom(objectId).required(),
    receiverID: Joi.string().custom(objectId).required(),
    message: Joi.object().keys({
      text: Joi.string(),
      image: Joi.string(),
    }),
  }),
};

export const messageList = {
  params: Joi.object().keys({
    conversationID: Joi.string().custom(objectId).required(),
  }),
};
