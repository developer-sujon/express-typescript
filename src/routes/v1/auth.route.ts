//External Lib Import
import express from 'express';
import validate from '../../middlewares/validate';

//Internal Lib Import
import * as authController from '../../controllers/auth.controller';
import * as authValidation from '../../validations/auth.validation';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validate(authValidation.register),
  authController.register
);

router.post('/login', validate(authValidation.login), authController.login);

router.get(
  '/fotgetPassword/:email',
  validate(authValidation.fotgetPassword),
  authController.fotgetPassword
);

router.get(
  '/verifyForgetToken/:email/:token',
  validate(authValidation.verifyForgetToken),
  authController.verifyForgetToken
);

router.post(
  '/resetPasswordToken/:email/:token',
  validate(authValidation.resetPasswordToken),
  authController.resetPasswordToken
);

export default router;
