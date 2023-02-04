//External Lib Import
import { Request, Response } from 'express';
import httpStatus from 'http-status';

//Internal Lib Import
import catchAsync from '../helpers/catchAsync';
import * as messageService from '../services/message.service';

/**
 * @desc message create
 * @access private
 * @route /api/v1/message/messageCreate
 * @methud POST
 */

export const messageCreate = catchAsync(async (req: Request, res: Response) => {
  await messageService.messageCreate(req);

  res
    .status(httpStatus.CREATED)
    .json({ message: 'Message Create Successfully' });
});

/**
 * @desc message list
 * @access private
 * @route /api/v1/message/messageList/:conversationID
 * @methud GET
 */
export const messageList = catchAsync(async (req: Request, res: Response) => {
  const data = await messageService.messageList(req);
  res.json(data);
});
