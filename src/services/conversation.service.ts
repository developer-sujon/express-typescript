//External Lib Import
import { Request } from 'express';
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

//Internal Lib Import
import Conversation from '../models/conversation.model';
import { IConversation } from '../interfaces/conversation.interface';
import * as commonService from './common.service';

/**
 * @desc conversation create
 */
export const conversationCreate = async (
  request: Request
): Promise<IConversation> => {
  const { senderID, receiverID } = request.body;

  const exist = await Conversation.findOne({
    members: { $all: [senderID, receiverID] },
  });

  if (exist) {
    return exist;
  }

  return new Conversation({
    members: [senderID, receiverID],
  }).save();
};

/**
 * @desc conversation list
 */
export const conversationList = (
  request: Request
): Promise<[IConversation]> => {
  const matchQuery = {
    $match: {
      members: {
        $all: [
          new ObjectId(request.params.senderID),
          new ObjectId(request.params.receiverID),
        ],
      },
    },
  };

  const projection = {
    $project: {
      _id: 0,
    },
  };

  return commonService.listService(Conversation, matchQuery, projection);
};
