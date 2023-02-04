//External Lib Import
import { Request } from 'express';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

//Internal Lib Import
import Message from '../models/message.model';
import * as commonService from './common.service';
import { IMessage } from './../interfaces/message.interface';

/**
 * @desc message create
 */
export const messageCreate = (request: Request): Promise<IMessage> => {
  const unique = false;
  const uniqueValue = {};
  const errorMessage = '';
  return commonService.createService(
    Message,
    unique,
    uniqueValue,
    errorMessage,
    request.body
  );
};

/**
 * @desc message list
 */
export const messageList = (request: Request): Promise<[IMessage]> => {
  const matchQuery = {
    $match: {
      conversationID: new ObjectId(request.params.conversationID),
    },
  };
  const projection = {
    $project: {
      _id: 0,
    },
  };
  return commonService.listService(Message, matchQuery, projection);
};
