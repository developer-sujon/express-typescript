//External Lib Import
import { Request, Response } from 'express';
import httpStatus from 'http-status';

//Internal Lib Import
import catchAsync from '../helpers/catchAsync';
import * as conversationService from '../services/conversation.service';

/**
 * @desc conversation create
 * @access private
 * @route /api/v1/conversation/conversationCreate
 * @methud POST
 */

export const conversationCreate = catchAsync(
  async (req: Request, res: Response) => {
    await conversationService.conversationCreate(req);

    res
      .status(httpStatus.CREATED)
      .json({ conversation: 'conversation Create Successfully' });
  }
);

/**
 * @desc conversation list
 * @access private
 * @route /api/v1/conversation/conversationList/:senderID/:receiverID
 * @methud GET
 */
export const conversationList = catchAsync(
  async (req: Request, res: Response) => {
    const data = await conversationService.conversationList(req);
    res.json(data);
  }
);
