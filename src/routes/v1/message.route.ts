//External Lib Import
import express from 'express';
import validate from '../../middlewares/validate';

//Internal Lib Import
import * as messageController from '../../controllers/message.controller';
import * as messageValidation from '../../validations/message.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/messageCreate',
  auth(),
  validate(messageValidation.messageCreate),
  messageController.messageCreate
);

router.get(
  '/messageList/:conversationID',
  auth(),
  validate(messageValidation.messageList),
  messageController.messageList
);

export default router;
