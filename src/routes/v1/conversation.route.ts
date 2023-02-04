//External Lib Import
import express from 'express';
import validate from '../../middlewares/validate';

//Internal Lib Import
import * as conversationController from '../../controllers/conversation.controller';
import * as conversationValidation from '../../validations/conversation.validation';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/conversationCreate',
  auth(),
  validate(conversationValidation.conversationCreate),
  conversationController.conversationCreate
);

router.get(
  '/conversationList/:senderID/:receiverID',
  auth(),
  validate(conversationValidation.conversationList),
  conversationController.conversationList
);

export default router;
